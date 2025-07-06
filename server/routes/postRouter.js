const express = require("express");
const postRouter = express.Router();

const postController = require("../controllers/postController");
const upload = require("../middleware/imageUpload");
const auth = require("../middleware/auth");
const multer = require("multer");

// Public routes (anyone can access)
postRouter.get("/", postController.getAllPosts);
postRouter.get("/categories", postController.getCategories);
postRouter.get("/:id", postController.getPostById); // View single post by ID

// Protected routes (need to be logged in)
postRouter.post("/", auth, upload.single("image"), postController.createPost);
postRouter.put("/:id", auth, upload.single("image"), postController.updatePost); // Update post
postRouter.delete("/:id", auth, postController.deletePost); // Delete post
postRouter.get("/user/:userId", auth, postController.getUserPosts); // Get posts by user

// Error handling for upload
postRouter.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: "Image upload failed: " + error.message,
    });
  } else if (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An unknown error occurred",
    });
  }
  next();
});

module.exports = postRouter;
