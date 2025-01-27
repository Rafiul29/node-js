const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, Image };
