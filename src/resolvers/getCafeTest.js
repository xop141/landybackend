import Cafe from "../models/cafeModel.js";
import client from "../redisClient.js";
const getCafeTest = async (req,res) => {

  const page = parseInt(req.query.page) || 1;

  try {
    const cached = await client.get(`cafes:page:${page}`);
    if (!cached) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.json(JSON.parse(cached));
  } catch (err) {
    console.error("❌ Error fetching cafes page:", err);
    res.status(500).json({ error: "Server error" });
  }
};
export default getCafeTest