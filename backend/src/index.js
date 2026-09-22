import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const app = createApp();

connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Lingua backend listening on http://localhost:${env.port}`);
      console.log(`CORS origin: ${env.frontendUrl}`);
      console.log(`MongoDB: ${env.mongoUri}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server: MongoDB connection failed");
    console.error("Hint: ensure MongoDB is running locally or update MONGODB_URI in .env");
    console.error(err.message);
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection", err);
});
