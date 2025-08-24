import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
type: String,
required: true,
    },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});

export default mongoose.model("Location", locationSchema);