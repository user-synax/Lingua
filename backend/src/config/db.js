import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(env.mongoUri, {
      autoIndex: true,
    });
    console.log(`MongoDB connected: ${mongoose.connection.host} / ${mongoose.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err;
  }
}
