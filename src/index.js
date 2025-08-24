import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cafeRoute from "./route/cafeRoute.js";
import { createClient } from "redis";
import compression from 'compression'


dotenv.config();
const app = express();
app.use(compression())
app.use(
  cors({
    origin: "https://landyfront.vercel.app",
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;


const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.error("Redis Client Error:", err));


const main = async () => {
  await client.connect();
  app.use("/", cafeRoute);
  app.listen(PORT);
};

main();
