import cafeModel from "../models/cafeModel.js";

const getSpec = async (req, res) => {
  try {
    const { id } = req.params;
    const cafe = await cafeModel.findById(id,"pcs").lean();

    if (!cafe) {
      return res.status(404).json({ message: "Cafe not found" });
    }

    res.json(cafe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cafe details", error });
  }
};

export default getSpec;