const express = require("express");
const { registerUser, loginUser } = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser)

module.exports = { userRouter };
