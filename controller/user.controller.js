const { userModel } = require("../model/user.model");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const registerUser = async (req, res) => {
  const registerData = req.body;
  registerData.password = bcrypt.hashSync(registerData.password, 8);
  try {
    const userData = new userModel(registerData);
    await userData.save();
    return res.status(201).send({ msg: "user registered successfully" });
  } catch (error) {
    return res.status(400).send({ err: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await userModel.findOne({ email });
    if (userData) {
      let checker = bcrypt.compareSync(password, userData.password);
      if (checker) {
        return res
          .status(200)
          .json({
            msg: "login successfull",
            token: jwt.sign({ userId: userData._id }, process.env.secretKey, {
              expiresIn: "3h",
            }),
          });
      } else {
        return res.status(400).send({ msg: "wrong password" });
      }
    }else{
        res.status(400).json({ msg: "invalid email" });
    }
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

module.exports = { registerUser, loginUser };
