const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: String,
});

const Category = mongoose.model("Category", schema);

exports.Category = Category;
