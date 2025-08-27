import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cafeRoute from "./route/cafeRoute.js";
import compression from 'compression'
import { preloadCache } from "./resolvers/preloadCache.js";

dotenv.config();
const app = express();
app.use(compression())
app.use(
  cors({
    origin: ["https://landyfront.vercel.app",
     "http://localhost:3000"]
  })
);
app.use(express.json());


 mongoose
   .connect(process.env.MONGO_URL)
   .then(() => console.log("✅ DB connected"))
   .catch((err) => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;


const main = async () => {
  await preloadCache();
  app.use("/", cafeRoute);
  app.listen(PORT);
};

main();
