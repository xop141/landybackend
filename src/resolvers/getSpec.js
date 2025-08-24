import cafeModel from "../models/cafeModel.js";
import redisClient from "../config/redisClient.js";

const getSpec = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required" });

    const cacheKey = `cafe:${id}`;
    
  
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("✅ Serving specs from Redis");
      return res.json(JSON.parse(cached));
    }

    const cafe = await cafeModel.findById(id, "pcs").lean();
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(cafe));
    res.json(cafe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cafe specs", error });
  }
};

export default getSpec;
