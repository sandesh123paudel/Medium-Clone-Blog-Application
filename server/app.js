//Modules
require("dotenv").config(); // 👈 load env firstn
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRouter");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//API Test
app.get("/", (req, res) => {
  res.send("API is working");
});

//Routes
app.use("/api/auth/", authRouter);

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
