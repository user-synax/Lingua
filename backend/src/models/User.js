import mongoose from "mongoose";

const onboardingSchema = new mongoose.Schema(
  {
    target: { type: String, enum: ["de", "es", "fr", "ja", "pt", "en", "it", "ko"], default: null },
    nativeLang: { type: String, default: null },
    goal: { type: String, enum: ["career", "exam", "family", "relocation", "travel"], default: null },
    deadline: { type: Date, default: null },
    hours: { type: Number, min: 3, max: 15, default: null },
    availability: { type: Map, of: Boolean, default: () => new Map() },
    timezone: { type: String, default: "Asia/Kolkata" },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
    },
    passwordHash: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    // verification via 6-digit code (hashed)
    verificationCodeHash: { type: String, default: null },
    verificationExpires: { type: Date, default: null },
    // password reset
    resetCodeHash: { type: String, default: null },
    resetExpires: { type: Date, default: null },
    // refresh token rotation (hashed)
    refreshTokenHash: { type: String, default: null },
    refreshTokenExpires: { type: Date, default: null },
    onboarding: { type: onboardingSchema, default: () => ({}) },
  },
  { timestamps: true }
);

// Hide sensitive fields when converting to JSON
userSchema.methods.toSafeObject = function () {
  const obj = this.toObject({ versionKey: false });
  delete obj.passwordHash;
  delete obj.verificationCodeHash;
  delete obj.resetCodeHash;
  delete obj.refreshTokenHash;
  // Convert Map to object for JSON
  if (obj.onboarding?.availability instanceof Map) {
    obj.onboarding.availability = Object.fromEntries(obj.onboarding.availability);
  }
  return obj;
};

export const User = mongoose.model("User", userSchema);
