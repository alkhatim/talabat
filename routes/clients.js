const express = require("express");
const router = express.Router();
const { Client, validate } = require("../models/Client");
const admin = require("../middleware/admin");
const validateId = require("../middleware/validateId");

router.get("/", async (req, res) => {
  const clients = await Client.find({}).lean();
  res.status(200).send(clients);
});

router.get("/lookup", async (req, res) => {
  const clients = await Client.find({}).select("name").lean();
  res.status(200).send(clients);
});

router.get("/:id", validateId, async (req, res) => {
  const client = await Client.findById(req.params.id).lean();
  res.status(200).send(client);
});

router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const client = new Client(req.body);

  await client.save();

  res.status(201).send(client);
});

router.put("/:id", validateId, async (req, res) => {
  let client = await Client.findById(req.params.id);
  if (!client)
    return res.status(404).send("There is no client with the given Id");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).lean();

  res.status(200).send(client);
});

router.delete("/:id", [admin, validateId], async (req, res) => {
  const client = await Client.findByIdAndDelete(req.params.id).lean();
  if (!client) return res.status(404).send("There is no client with the given ID");
  res.status(200).send(client);
});

module.exports = router;
