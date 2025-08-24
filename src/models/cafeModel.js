import mongoose from "mongoose";


const pcSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpu: { type: String, required: true },
  gpu: { type: String, required: true },
  ram: { type: String, required: true },
  monitor: { type: String, required: true },
  mouse:{type: String},
  headset:{type: String},
  keyboard:{type: String},
  pricePerHour: { type: Number, required: true },
});

const cafeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    images: {
      type: [String], 
      default: [],
    },

    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },

    pcs: [pcSchema],

    address: { type: String, default: "" },
    rating: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

const cafeModel = mongoose.model("Cafe", cafeSchema);

export default cafeModel;