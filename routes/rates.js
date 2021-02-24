const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const admin = require("../middleware/admin");

router.post("/", admin, async (req, res) => {
  const rates = {
    USD: 1,
    SDG: parseFloat(req.body.SDG),
    AED: parseFloat(req.body.AED),
    SAR: parseFloat(req.body.SAR),
  };

  await mongoose.connection
    .collection("config")
    .updateOne({ name: "rates" }, { $set: rates });

  res.status(200).send(rates);
});

router.get("/", admin, async (req, res) => {
  const rate = await mongoose.connection
    .collection("config")
    .findOne({ name: "rates" });
  res.status(200).send(rate);
});

module.exports = router;
