const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const admin = require("../middleware/admin");

router.use(admin);

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  const rate = await mongoose.connection
    .collection("config")
    .findOne({ name: "rates" });
  res.status(200).send(rate);
});

module.exports = router;
