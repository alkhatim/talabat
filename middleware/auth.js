const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function(req, res, next) {
  const token = req.header("x-token");
  if (!token) return res.status(401).send("You must be logged in first");

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid authentication token");
  }
};
