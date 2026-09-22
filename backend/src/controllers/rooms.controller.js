import { AccessToken } from "livekit-server-sdk";
import { env } from "../config/env.js";
import { Room } from "../models/Room.js";

function isPlaceholderLiveKit() {
  return (
    !env.livekitKey ||
    !env.livekitSecret ||
    env.livekitKey === "devkey_placeholder" ||
    env.livekitSecret.includes("placeholder") ||
    env.livekitUrl.includes("your-project")
  );
}

export async function createRoom(req, res, next) {
  try {
    let { name } = req.body || {};
    if (!name) {
      // deterministic per-user room if not supplied
      const suffix = Math.random().toString(36).slice(2, 8);
      name = `lingua-${req.user._id.toString().slice(-6)}-${suffix}`;
    }
    name = name.toLowerCase().replace(/[^a-z0-9_-]/g, "-");

    const existing = await Room.findOne({ name });
    if (existing) {
      return res.json({ room: existing });
    }

    const room = await Room.create({
      name,
      createdBy: req.user._id,
      isActive: true,
    });

    res.status(201).json({ room });
  } catch (err) {
    // duplicate race
    if (err.code === 11000) {
      const room = await Room.findOne({ name: err.keyValue?.name || req.body.name });
      return res.json({ room });
    }
    next(err);
  }
}

export async function listRooms(req, res, next) {
  try {
    const rooms = await Room.find({ $or: [{ createdBy: req.user._id }, { isActive: true }] })
      .sort({ updatedAt: -1 })
      .limit(20)
      .lean();
    res.json({ rooms });
  } catch (err) {
    next(err);
  }
}

export async function getRoom(req, res, next) {
  try {
    const { name } = req.params;
    const room = await Room.findOne({ name });
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json({ room });
  } catch (err) {
    next(err);
  }
}

export async function token(req, res, next) {
  try {
    const { roomName, participantName } = req.body;
    const user = req.user;

    // ensure room doc exists (ephemeral but tracked for history)
    let room = await Room.findOne({ name: roomName });
    if (!room) {
      room = await Room.create({ name: roomName, createdBy: user._id });
    } else {
      // touch updatedAt
      room.updatedAt = new Date();
      await room.save();
    }

    if (isPlaceholderLiveKit()) {
      // graceful dev placeholder — still return a dummy token shape so UI can show config error
      return res.status(503).json({
        error: "LiveKit not configured — set LIVEKIT_URL / LIVEKIT_API_KEY / LIVEKIT_API_SECRET in backend/.env",
        hint: "Replace wss://your-project.livekit.cloud and devkey_placeholder with your LiveKit Cloud creds, then restart backend",
        livekitUrl: env.livekitUrl,
        isPlaceholder: true,
      });
    }

    const at = new AccessToken(env.livekitKey, env.livekitSecret, {
      identity: user._id.toString(),
      name: participantName || user.name || user.email,
      ttl: 60 * 60 * 2, // 2h — covers 60-min class
    });

    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const jwt = await at.toJwt();

    res.json({
      token: jwt,
      url: env.livekitUrl,
      room: room.name,
      identity: user._id.toString(),
    });
  } catch (err) {
    next(err);
  }
}
