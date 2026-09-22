import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: parseInt(process.env.PORT || "5000", 10),
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lingua",
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  accessExpires: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  refreshExpires: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  cookieSecure: process.env.COOKIE_SECURE === "true",
  livekitUrl: process.env.LIVEKIT_URL || "wss://your-project.livekit.cloud",
  livekitKey: process.env.LIVEKIT_API_KEY || "devkey_placeholder",
  livekitSecret: process.env.LIVEKIT_API_SECRET || "devsecret_placeholder_32chars_minimum_______",
};

if (!env.accessSecret || !env.refreshSecret) {
  console.error("Missing ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET in .env");
  process.exit(1);
}
if (env.accessSecret.length < 32 || env.refreshSecret.length < 32) {
  console.warn("Warning: token secrets should be at least 32 characters for security");
}
