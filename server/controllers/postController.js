const Post = require("../models/post");
const fs = require("fs");
const mongoose = require("mongoose");

// Utility to calculate estimated read time
const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Create a new blog post
const createPost = async (req, res) => {
  try {
    console.log("Creating new post with data:", {
      title: req.body.title,
      category: req.body.category,
      userId: req.user?._id,
      hasFile: !!req.file,
    });

    const { title, content, category, preview, tags } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      console.error("No user ID found in request");
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!req.file) {
      console.error("No image file found in request");
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    if (!title || !content || !category) {
      console.error("Missing required fields:", { title, content, category });
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required",
      });
    }

    const readTime = calculateReadTime(content);

    const newPost = new Post({
      title,
      content,
      category,
      preview: preview || content.substring(0, 200) + "...",
      tags: tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      image: req.file.path,
      userId,
      readTime,
    });

    console.log("Attempting to save post with ID:", newPost._id);
    await newPost.save();
    console.log("Post saved successfully");

    await newPost.populate("userId", "name email");

    // Verify the post was saved
    const savedPost = await Post.findById(newPost._id);
    console.log("Verified saved post:", {
      id: savedPost._id,
      title: savedPost.title,
      userId: savedPost.userId,
    });

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting uploaded file:", unlinkError);
      }
    }
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
};

// Get all blog posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 }); // Latest posts first

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { title, content, category, preview, tags, coverImage } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.userId.toString() !== userId.toString()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this post",
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (content) {
      updateData.content = content;
      updateData.readTime = calculateReadTime(content);
    }
    if (category) updateData.category = category;
    if (preview) updateData.preview = preview;
    if (tags) updateData.tags = tags.split(",");
    if (coverImage) updateData.coverImage = coverImage;

    if (req.file) {
      if (post.image && fs.existsSync(post.image)) {
        fs.unlinkSync(post.image);
      }
      updateData.image = req.file.path;
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
    }).populate("userId", "name email");

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user owns the post
    if (post.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this post",
      });
    }

    // Delete the image file
    if (post.image && fs.existsSync(post.image)) {
      fs.unlinkSync(post.image);
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get posts by user
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Fetching posts for user:", userId);

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid user ID format:", userId);
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // First check if any posts exist for this user
    const postCount = await Post.countDocuments({ userId });
    console.log(`Found ${postCount} posts for user ${userId}`);

    // Find posts
    const posts = await Post.find({ userId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    console.log(
      "Post details:",
      posts.map((post) => ({
        id: post._id,
        title: post.title,
        userId: post.userId._id,
      }))
    );

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Error in getUserPosts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user posts",
      error: error.message,
    });
  }
};

// Get available categories
const getCategories = async (req, res) => {
  try {
    const categories = [
      "Technology",
      "Health",
      "Education",
      "Travel",
      "Food",
      "Lifestyle",
      "Business",
      "Entertainment",
      "Sports",
      "News",
      "Personal",
      "Other",
    ];

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
  getCategories,
};
