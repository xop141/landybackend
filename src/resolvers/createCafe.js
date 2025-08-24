import cafeModel from "../models/cafeModel.js";
const createCafe =async (req,res) =>{
  try {
    const { name, lat, lng, address, images, pcs } = req.body;

   
    const pcArray = typeof pcs === "string" ? JSON.parse(pcs) : pcs;

    const newCafe = new cafeModel({
      name,       
      location: { lat, lng },
      images: images || [], 
      address: address || "",
      pcs: pcArray || [],
    });

    await newCafe.save();
    res.status(201).json(newCafe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create cafe", error });
  }
}
export default createCafe