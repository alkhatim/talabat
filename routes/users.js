const express = require("express");
const router = express.Router();
const _ = require("lodash");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/User");
const { Client } = require("../models/Client");
const validateId = require("../middleware/validateId");

router.use(admin);

router.get("/", async (req, res) => {
  const users = await User.find({}).select("-password").lean();
  for (let user of users) {
    user.clients = await Client.count({ createdBy: user._id });
  }
  res.status(200).send(users);
});

router.get("/:id", validateId, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").lean();
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (await User.findOne({ username: req.body.username }))
    return res.status(400).send("Username alreay registered");

  const salt = await bcrypt.genSalt(10);
  const random = Math.random().toString(36).substring(2);
  req.body.password = await bcrypt.hash(random, salt);

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    email: req.body.email,
    role: req.body.role,
  });

  await user.save();

  res
    .status(201)
    .send(_.pick(user, ["_id", "username", "phone", "email", "role"]));
});

router.put("/:id", validateId, async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("There is no user with the given Id");

  if (user.role === "admin") return res.status(400).send("Can't edit an admin");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (
    await User.findOne({
      username: req.body.username,
      _id: { $ne: req.params.id },
    })
  )
    return res.status(400).send("Username alreay registered");

  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).lean();

  res
    .status(200)
    .send(_.pick(user, ["_id", "username", "phone", "email", "role"]));
});

router.post("/reset/:id", validateId, async (req, res) => {
  const user = await User.findById(req.params.id);

  const salt = await bcrypt.genSalt(10);
  const random = Math.random().toString(36).substring(2);
  const password = await bcrypt.hash(random, salt);

  user.password = password;
  await user.save();

  res.status(200).send({ password: random });
});

router.delete("/:id", validateId, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("There is no user with the given ID");

  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).send("Why do you want to delete yourself :(");
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send();
});

module.exports = router;
