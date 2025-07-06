const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: true,
      minlength: [10, "Description must be at least 10 characters long"],
      trim: true,
    },
    preview: {
      type: String,
      trim: true,
      maxlength: [500, "Preview cannot exceed 500 characters"],
    },
    coverImage: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
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
        "Other",
      ],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    readTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
