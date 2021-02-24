const express = require("express");
const router = express.Router();
const { Category } = require("../models/Category");
const validateId = require("../middleware/validateId");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const categories = await Category.find({}).lean();
  res.status(200).send(categories);
});

router.post("/", admin, async (req, res) => {
  const category = new Category(req.body);

  await category.save();

  res.status(201).send(category);
});

router.delete("/:id", validateId, async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id).lean();
  if (!category)
    return res.status(404).send("There is no category with the given ID");
  res.status(200).send(category);
});

module.exports = router;
