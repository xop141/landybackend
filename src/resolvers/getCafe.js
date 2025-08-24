import cafeModel from "../models/cafeModel.js";

const getCafe = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const cafes = await cafeModel
      .find({}, "images name _id pcs.pricePerHour pcs.name")
      .skip(skip)
      .limit(limit);

    const total = await cafeModel.countDocuments();

    res.json({
      cafes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cafes", error });
  }
};

export default getCafe;
