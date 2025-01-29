const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Use path.resolve(process.cwd(), ...) instead of __dirname to always reference the project root directory (process.cwd() returns the current working directory).
// This ensures that file paths are consistent regardless of where the utility file (util.js) is located in the project structure.

const uploadFile = (subDir = "") => {
  const UPLOAD_DIR = `public/images/${subDir}`;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.resolve(process.cwd(), `public/images/${subDir}`);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLocaleLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  const upload = multer({ storage ,limits: { fileSize: 5 * 1024 * 1024 }, });

  return upload;
};

module.exports = { uploadFile };
