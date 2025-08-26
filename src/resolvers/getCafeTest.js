import { getCafeCache } from "./preloadCache.js";

const getCafeTest = async (req, res) => {
  try {
    const cafes = await getCafeCache();
    res.json(cafes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getCafeTest;