const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sanitizeFilename = (filename) => {
  // Replace spaces with hyphens
  filename = filename.replace(/\s/g, "-");

  // Remove any non-ASCII characters
  filename = filename.replace(/[^a-zA-Z0-9_-]/g, "");

  // Remove any duplicate extensions, ensuring only one file extension is kept
  const extension = filename.split(".").pop();
  if (["jpg", "jpeg", "png", "gif", "heic", "heif"].includes(extension)) {
    filename = filename.substring(0, filename.lastIndexOf(".")); // Remove last extension
  }

  return filename;
};

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const sanitizedFilename = sanitizeFilename(file.originalname);

    return {
      folder: "product-images",
      public_id: `${Date.now()}-${sanitizedFilename}`,
      allowed_formats: ["jpg", "png", "jpeg", "heic", "heif", "webp"],
    };
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (![".jpg", ".png", ".jpeg", ".heic", ".heif", ".webp"].includes(ext)) {
    return cb(
      new Error("Only .jpg, .png, .jpeg, .heic, and .heif images are allowed")
    );
  }
  cb(null, true);
};

const productParser = multer({
  storage: productStorage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB file size limit
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = {
  productParser,
};
