const jwt = require("jsonwebtoken");
require("dotenv").config();

const relationShip = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  const decoded = jwt.verify(token, process.env.secretKey);
    req.body.userId = decoded.userId
    next();
};

module.exports = { relationShip };
