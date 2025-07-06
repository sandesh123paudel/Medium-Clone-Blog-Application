//Modules
require("dotenv").config(); // 👈 load env first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

// Error handling middleware for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: "File upload error",
      error: err.message,
    });
  }
  next(err);
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server is running on port http://localhost:${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => {
    console.log("Mongo DB Error:", err);
  });

module.exports = app;
