const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).send("The username or password or both are wrong");

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match)
    return res.status(400).send("The username or password or both are wrong");

  const token = user.genJwt();

  res
    .status(200)
    .header("access-control-expose-headers", "x-token")
    .header("x-token", token)
    .send(_.pick(user, ["_id", "username", "phone", "email", "role"]));
});

router.put("/", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      phone: req.body.phone,
      email: req.body.email,
    },
    { new: true }
  ).lean();

  res
    .status(200)
    .send(_.pick(user, ["_id", "username", "phone", "email", "role"]));
});

router.put("/updatepassword", auth, async (req, res) => {
  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).send("Passwords don't match");
  }

  let user = await User.findById(req.user._id).lean();

  const match = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!match) return res.status(400).send("Wrong password");

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.newPassword, salt);

  user = await User.findByIdAndUpdate(
    req.user._id,
    { password },
    { new: true }
  ).lean();

  res
    .status(200)
    .send(_.pick(user, ["_id", "username", "phone", "email", "role"]));
});

router.get("/", async (req, res) => {
  const token = req.header("x-token");
  if (!token) return res.status(401).send("No authentication token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decoded._id)
      .select("_id username phone email role")
      .lean();
    if (!user) return res.status(400).send("Wrong token");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Invalid authentication token");
  }
});

module.exports = router;
