const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello word ");
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
