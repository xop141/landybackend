import cafeModel from "../models/cafeModel.js";
const getCafeLocation = async (req, res) => {
  try {
    const allCafes = await cafeModel.find({},"location name _id");
    res.json(allCafes);
  } catch (error) {
    console.log(error);
  }
  // try{
  //   const {name, lat,lng} = req.body
  //   const newCafe = locationModel({
  //     name:name,lat:lat,lng:lng
  //   })
  //   await newCafe.save()
  // } catch (error){
  //   console.log(error);
    
  // }
};
export default getCafeLocation;
