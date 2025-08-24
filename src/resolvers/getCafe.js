import cafeModel from "../models/cafeModel.js";
import redisClient from "../config/redisClient.js";
const getCafe = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const cacheKey = `cafes:${page}:${limit}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("✅ Serving cafes from Redis");
      return res.json(JSON.parse(cached));
    } else{
      console.log('serving from db');
      
    }

    const cafes = await cafeModel
      .find({}, "images name _id")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await cafeModel.countDocuments();

    const result = {
      cafes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };

    await redisClient.set(cacheKey, JSON.stringify(result));
  

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cafes", error });
  }
};

export default getCafe;
