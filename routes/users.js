const express = require("express");
const router = express.Router();
const _ = require("lodash");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/User");
const validateId = require("../middleware/validateId");

router.get("/", async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).send(users);
});

router.get("/id", validateId, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.status(200).send(user);
});

router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (await User.findOne({ username: req.body.username }))
    return res.status(400).send("Username alreay registered");

  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );

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

router.put("/:id", [admin, validateId], async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("There is no user with the given Id");

  if (req.user.id != user.id && req.user.role != "admin")
    return res.status(403).send("You must be an admin to edit another user");

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

  user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res
    .status(200)
    .send(_.pick(user, ["_id", "username", "phone", "email", "role"]));
});

router.delete("/:id", [admin, validateId], async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("There is no user with the given ID");
  res.status(200).send();
});

module.exports = router;
