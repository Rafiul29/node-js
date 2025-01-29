const path = require("path");
const fs = require("fs");

const deleteFile = async (filePath) => {
  try {
    const uploadDir = path.join(process.cwd(), filePath);

    await fs.promises.access(uploadDir);

    fs.unlink(uploadDir, (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.warn(`File not found (already deleted): ${uploadDir}`);
        } else {
          console.error(`Error deleting file: ${uploadDir}`, err);
        }
      } else {
        console.log(`File deleted: ${uploadDir}`);
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

module.exports = { deleteFile };
