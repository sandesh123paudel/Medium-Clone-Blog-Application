const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.get("/login", authController.login);
authRouter.get("/register", authController.register);

module.exports = authRouter;
