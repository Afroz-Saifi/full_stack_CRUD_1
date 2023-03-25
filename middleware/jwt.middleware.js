const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    if (decoded) {
      next();
    } else {
      return res
        .status(400)
        .json({ err: "You are not authorized for this route" });
    }
  } catch (error) {
    return res.status(400).send({err: "you are not authorized to access this route"})
  }
};

module.exports = { jwtAuth };
