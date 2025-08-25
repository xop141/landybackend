import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cafeRoute from "./route/cafeRoute.js";
import client from "./config/redisClient.js";
import compression from 'compression'
import Cafe from "./models/cafeModel.js";

dotenv.config();
const app = express();
app.use(compression())
app.use(
  cors({
    origin: "https://landyfront.vercel.app",
    // https://landyfront.vercel.app
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;






const preloadCafes = async () => {
  try {
    const cafes = await Cafe.find({});
    console.log(`Found ${cafes.length} cafes`);

    // Store 1 by 1
    for (const cafe of cafes) {
      await client.set(`cafe:${cafe._id}`, JSON.stringify(cafe));
    }

    // Store paginated slices
    const pageSize = 4; // adjust as you like
    for (let i = 0; i < cafes.length; i += pageSize) {
      const page = Math.floor(i / pageSize) + 1;
      const slice = cafes.slice(i, i + pageSize);
      await client.set(`cafes:page:${page}`, JSON.stringify(slice));
    }

    console.log("✅ Cafes cached individually and paginated in Redis");
  } catch (err) {
    console.error("❌ Error caching cafes:", err);
  }
};


const main = async () => {
  // await preloadCafes();
  app.use("/", cafeRoute);
  app.listen(PORT);
};

main();
