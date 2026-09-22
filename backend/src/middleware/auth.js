import { verifyAccessToken, verifyRefreshToken, signAccessToken } from "../utils/jwt.js";
import { User } from "../models/User.js";
import { hashToken } from "../utils/hash.js";
import { setAuthCookies } from "../utils/cookie.js";
import { signRefreshToken } from "../utils/jwt.js";

export async function requireAuth(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: no access token" });
  }
  try {
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: "Unauthorized: user not found" });
    req.user = user;
    req.userId = payload.sub;
    next();
  } catch (err) {
    // Access token expired -> try to refresh silently if refresh exists?
    // We require explicit refresh call; just return 401 with hint
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Access token expired", code: "ACCESS_EXPIRED" });
    }
    return res.status(401).json({ error: "Unauthorized: invalid token" });
  }
}

// Optional auth: attaches user if token valid, otherwise continues
export async function optionalAuth(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) return next();
  try {
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);
    if (user) {
      req.user = user;
      req.userId = payload.sub;
    }
  } catch {}
  next();
}
