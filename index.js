const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
const { uploadFile } = require("./utils/uploadFile");
const { Image, Product } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

app.get("/", (req, res) => {
  res.send("hello word ");
});

// configuration multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(__dirname, "uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const fileExt = path.extname(file.originalname);
//     const fileName =
//       file.originalname
//         .replace(fileExt, "")
//         .toLocaleLowerCase()
//         .split(" ")
//         .join("-") +
//       "-" +
//       Date.now();

//     cb(null, fileName + fileExt);
//   },
// });

// const upload = multer({ storage });

// utility function to delete a file
const deleteFile = async (filePath) => {
  try {
    await fs.promises.access(filePath);

    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.warn(`File not found (already deleted): ${filePath}`);
        } else {
          console.error(`Error deleting file: ${filePath}`, err);
        }
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`ফাইল পাওয়া যায়নি (অলরেডি মুছে ফেলা হয়েছে): ${filePath}`);
    } else {
      console.error(`ফাইল পরীক্ষা করার সময় ত্রুটি: ${filePath}`, error);
    }
  }
};

const uploadProductFile = uploadFile("products");
// add products
app.post(
  "/api/products/",
  uploadProductFile.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      
      const { name, description, price } = req.body;
      console.log(req.files)
      
      let thumbnailPath = null;

      if (req.files?.thumbnail?.[0]) {
        thumbnailPath = req.files.thumbnail[0].path;
      }
      
      const product = new Product({
        name,
        description,
        price,
        thumbnail: thumbnailPath,
      });

      if (req.files.images) {
        const imagePaths = req.files.images.map((file) => ({
          url: file.path,
          product: product._id,
        }));

        const images = await Image.insertMany(imagePaths);
        product.images = images.map((img) => img._id);
      }

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Error creating product" });
    }
  }
);

// get all product
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean()
      .populate("images", "_id url product");
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .lean()
      .populate("images", "_id url product");

    if (!product) {
      res.status(404).json({ error: "Product Not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// update a single product
app.put(
  "/api/products/:id",
  uploadProductFile.fields([{ name: "thumbnail" }, { name: "images" }]),
  async (req, res) => {
    try {
      const { name, description, price } = req.body;

      const product = await Product.findById(req.params.id);

      if (!product) {
        res.status(404).json({ error: "Product not found" });
      }

      if (req.files.thumbnail[0]) {
        product.thumbnail = req.files.thumbnail[0].path;
      } else {
        product.thumbnail = product.thumbnail;
      }

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;

      if (req.files.images) {
        // Remove old image
        await Image.deleteMany({ product: product._id });

        const imagePaths = req.files.images.map((file) => ({
          url: file.path,
          product: product._id,
        }));

        const images = await Image.insertMany(imagePaths);

        product.images = images.map((img) => img._id);
      }

      await product.save();

      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error Updating product" });
    }
  }
);

// delete Product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (product.thumbnail) {
      const thumbnailPath = path.join(__dirname, product.thumbnail);
      await deleteFile(thumbnailPath);
    }

    const images = await Image.find({ product: product._id });

    await Promise.all(
      images.map(async (image) => {
        const imagePath = path.join(__dirname, image.url);
        await deleteFile(imagePath);
      })
    );

    await Image.deleteMany({ product: product._id });

    await product.deleteOne();
    res.status(200).json({ message: "Product delete" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Deleteting Product" });
  }
});

const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/test_sb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.error("MongoDB connection error:", error));
