const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const admin = require("../middleware/admin");

router.use(admin);

router.post("/", async (req, res) => {
  const rates = {
    USD2SDG: parseFloat(req.body.USD2SDG),
    USD2AED: parseFloat(req.body.USD2AED),
    USD2SAR: parseFloat(req.body.USD2SAR),
    AED2SDG: parseFloat(req.body.AED2SDG),
    AED2SAR: parseFloat(req.body.AED2SAR),
    SAR2SDG: parseFloat(req.body.SAR2SDG),
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
