const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
const Video=require('./models/videoSchema')
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello word ");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov|avi|mkv/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb("Error: Video files only!");
    }
  },
});

app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title, description)
    const video = new Video({
      title,
      description,
      filename: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
    });
    await video.save();
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});


app.get('/videos',async(req,res)=>{
  const video =await Video.find();
  res.send(video)
})
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
