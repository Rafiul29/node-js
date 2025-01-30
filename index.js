const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
const { uploadFile } = require("./utils/uploadFile");
const { deleteFile } = require("./utils/deleteFile");

const { Image, Product, User, VerifyCode } = require("./models");
const { sendVerificationEmail } = require("./utils/emailService");

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
// const deleteFile = async (filePath) => {
//   try {
//     await fs.promises.access(filePath);

//     fs.unlink(filePath, (err) => {
//       if (err) {
//         if (err.code === "ENOENT") {
//           console.warn(`File not found (already deleted): ${filePath}`);
//         } else {
//           console.error(`Error deleting file: ${filePath}`, err);
//         }
//       } else {
//         console.log(`File deleted: ${filePath}`);
//       }
//     });
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       console.warn(`ফাইল পাওয়া যায়নি (অলরেডি মুছে ফেলা হয়েছে): ${filePath}`);
//     } else {
//       console.error(`ফাইল পরীক্ষা করার সময় ত্রুটি: ${filePath}`, error);
//     }
//   }
// };

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res
          .status(400)
          .json({ error: "File size too large. Maximum is 5MB." });
      case "LIMIT_UNEXPECTED_FILE":
        return res
          .status(400)
          .json({ error: "Unexpected file field or too many files." });
      default:
        return res.status(400).json({ error: `Multer error: ${err.message}` });
    }
  }
  next(err); // Pass to next middleware for non-Multer errors
};

const uploadProductFile = uploadFile("products");
// add products
app.post(
  "/api/products/",
  uploadProductFile.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  async (req, res, next) => {
    try {
      const { name, description, price } = req.body;

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
      next(error);
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

      // handle to thubnail
      if (req?.files?.thumbnail && req.files.thumbnail.length > 0) {
        await deleteFile(product.thumbnail);
        product.thumbnail = req.files.thumbnail[0].path;
      } else {
        product.thumbnail = product.thumbnail;
      }

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;

      // handle images
      if (req?.files?.images && req.files.images.length > 0) {
        // // Remove old image from db

        //   product.images.map(async (img) => {
        //     const id = img.toString();
        //     const image = await Image.findById(id);
        //       if(image){
        //         await deleteFile(image?.url);
        //         image?.deleteOne();
        //       }
        //   })

        // await Image.deleteMany({ product: product._id });

        const imagePaths = req.files.images.map((file) => ({
          url: file.path,
          product: product._id,
        }));

        const images = await Image.insertMany(imagePaths);

        product.images = [...product.images, ...images.map((img) => img._id)];
      } else {
        product.images = product.images;
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
      await deleteFile(product.thumbnail);
    }

    const images = await Image.find({ product: product._id });

    await Promise.all(
      images.map(async (image) => {
        await deleteFile(image.url);
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

// delete Image
app.delete("/api/images/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Optionally, delete the image file from the server
    await deleteFile(image.url);

    // update product images
    const pid = image.product.toString();

    const product = await Product.findById(pid);
    // filtered product images
    product.images = product.images.filter(
      (img) => img._id.toString() !== image._id.toString()
    );
    product.save();

    // Delete the image from the database
    await image.deleteOne();
    return res.status(200).json("Image delete sucessfull");
  } catch (error) {
    console.log(error.message);
  }
});

// user registration
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const code = Math.floor(10000 + Math.random() * 900000);

    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    const existingUser = await User.findOne({ email });

    // user exist account verify
    if (existingUser && existingUser.isVerify) {
      res.status(400).json({ message: "email already exists" });
      return;
    }

    let userId = null;

    // user exist but account not verify
    if (existingUser && !existingUser.isVerify) {
      const verifyCode = await VerifyCode.findOne({ userId: existingUser._id });
      // set verify and expiare
      verifyCode.code = code;
      verifyCode.expiresAt = expiresAt;
      await verifyCode.save();
      userId = existingUser._id;
    } else {
      // create a new user
      const user = new User({
        name,
        email,
        password,
      });

      // save to db user data
      await user.save();

      await VerifyCode.create({
        userId: user._id,
        code: code,
        expiresAt: expiresAt,
      });

      userId = user._id;
    }

    await sendVerificationEmail(name, email, code);
    res.status(201).json({
      message: "User registration successfully",
      userId,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/verify-code", async (req, res) => {
  try {
    const { userId, code } = req.body;
    const user = await User.findById(userId);

    const verifyCodeData = await VerifyCode.findOne({ userId: user._id });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (!verifyCodeData) {
      res.status(400).json({ message: "Verification data not found" });
      return;
    }

    if (verifyCodeData.code !== code) {
      res.status(400).json({ message: "Incorrect Email verification code" });
      return;
    }

    if (verifyCodeData.expiresAt < new Date()) {
      res.status(400).json({ message: "Verification code has expired." });
      return;
    }

    user.isVerify = true;
    await user.save();

    await verifyCodeData.deleteOne();

    res
      .status(200)
      .json({ message: "Email verified successfully. Please Login ......." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.patch("/resent-code/:uid", async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.params.uid);

    // find verify code data
    const verifyCodeData = await VerifyCode.findOne({ userId: req.params.uid });

    if (!verifyCodeData) {
      res.status(400).json({ message: "Verification data not found" });
      return;
    }

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // generate code and expaired date
    const code = Math.floor(10000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    await sendVerificationEmail(user.name, user.email, code);

    //update Verify Code  data
    verifyCodeData.code = code;
    verifyCodeData.expiresAt = expiresAt;

    await verifyCodeData.save();

    res.status(201).json({
      message: "resent email verification code",
      userId: user._id,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.use(multerErrorHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/test_sb")
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.error("MongoDB connection error:", error));
