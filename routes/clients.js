const express = require("express");
const router = express.Router();
const { Client, validate } = require("../models/Client");
const agent = require("../middleware/agent");
const admin = require("../middleware/admin");
const validateId = require("../middleware/validateId");

router.use(agent);

router.get("/", async (req, res) => {
  const query = {};
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  const clients = await Client.find(query).populate("createdBy").lean();
  res.status(200).send(clients);
});

router.get("/lookup", async (req, res) => {
  const query = {};
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  const clients = await Client.find(query).select("name").lean();
  res.status(200).send(clients);
});

router.get("/:id", validateId, async (req, res) => {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  const client = await Client.findOne(query).populate("createdBy").lean();
  if (!client) return res.status(404).send("No client with the given Id");
  res.status(200).send(client);
});

router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const client = new Client(req.body);
  client.createdBy = req.user._id;

  await client.save();

  res.status(201).send(client);
});

router.put("/:id", validateId, async (req, res) => {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  let client = await Client.findOne(query);
  if (!client)
    return res.status(404).send("There is no client with the given Id");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate("createdBy")
    .lean();

  res.status(200).send(client);
});

router.delete("/:id", validateId, async (req, res) => {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  const client = await Client.findOneAndDelete(query).lean();
  if (!client)
    return res.status(404).send("There is no client with the given ID");
  res.status(200).send(client);
});

module.exports = router;
