const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads folder if it doesn't exist
const uploadsDir = "uploads/images";
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  // Test write permissions
  const testFile = path.join(uploadsDir, "test.txt");
  fs.writeFileSync(testFile, "test");
  fs.unlinkSync(testFile);
} catch (error) {
  console.error("Error setting up uploads directory:", error);
  throw new Error("Failed to setup uploads directory");
}

// Configure where to store images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original name for better identification
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const safeFileName = file.originalname.replace(/[^a-zA-Z0-9]/g, "-");
    cb(null, `blog-${uniqueName}-${safeFileName}`);
  },
});

// Only allow image files
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }

  // Check file size before processing
  if (file.size > 5 * 1024 * 1024) {
    return cb(new Error("File size too large! Maximum size is 5MB."), false);
  }

  cb(null, true);
};

// Configure multer with error handling
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Create error handling middleware
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    console.error("Multer error:", error);
    return res.status(400).json({
      success: false,
      message: "Image upload failed: " + error.message,
    });
  } else if (error) {
    // An unknown error occurred
    console.error("Unknown upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Image upload failed: " + error.message,
    });
  }
  next();
};

module.exports = upload;
