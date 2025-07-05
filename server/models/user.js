const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Min 6 characters are needed"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
