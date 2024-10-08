const mongoose = require("mongoose");
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number },
    old_price: { type: Number },
    quantity: { type: Number },
    review: { type: Array, default: [] },
    date: { type: Date, default: Date.now },
    avilable: { type: Boolean, default: true },
  });
module.exports ={Product:Product}

  