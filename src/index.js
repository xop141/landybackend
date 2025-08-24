import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cafeRoute from "./route/cafeRoute.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "https://landyfront.vercel.app/", 
}));
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));
const PORT = process.env.PORT;

app.use("/", cafeRoute);

app.listen(PORT, () => {
  console.log("app running");
});
