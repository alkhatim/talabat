const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  USD: Number,
  SDG: Number,
  AED: Number,
  SAR: Number,
});

const Rate = mongoose.model("Rate", schema);

exports.Rate = Rate;
