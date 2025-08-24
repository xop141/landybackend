import dotenv from 'dotenv'
dotenv.config()
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

(async () => {
  await redisClient.connect();
  console.log("✅ Redis connected");
})();

export default redisClient;