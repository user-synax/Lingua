import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 64,
      match: [/^[a-zA-Z0-9_-]+$/, "Room name: alphanumeric, _ or - only"],
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
    // optional cohort linkage later — keep generic
    meta: {
      language: { type: String, default: null },
      level: { type: String, default: null },
    },
  },
  { timestamps: true }
);

roomSchema.index({ createdBy: 1, createdAt: -1 });

export const Room = mongoose.model("Room", roomSchema);
