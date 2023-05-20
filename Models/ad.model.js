const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Clothing", "Electronics", "Furniture", "Other"],
    required: true,
  },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now },
  price: { type: Number, require: true },
});

let adModel = mongoose.model("ad", adSchema);

module.exports = { adModel };
