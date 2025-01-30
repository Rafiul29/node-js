const mongoose = require("mongoose");

// Images Model
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

// Product Model
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

// User Model
const useSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerify: {
    type: Boolean,
    default: false,
  }
},{timestamps:true});
const User = mongoose.model("User", useSchema);

// verifyCode Model
const verifyCodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
},{timestamps:true});
const VerifyCode = mongoose.model("VerifyCode", verifyCodeSchema);

module.exports = { Product, Image, User, VerifyCode };
