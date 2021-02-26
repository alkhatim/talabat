const express = require("express");
const router = express.Router();
const { File, validate } = require("../models/File");
const validateId = require("../middleware/validateId");
const uploadFile = require("../helpers/uploadFile");
const getFile = require("../helpers/getFile");
const deleteFile = require("../helpers/deleteFile");

router.get("/:id", async (req, res) => {
  const files = await File.find({ owner: req.params.id }).lean();
  res.status(200).send(files);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await uploadFile(
      `${req.body.owner}_${req.body.name}`,
      req.body.data,
      req.body.mime
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send("Couldn't Upload file");
  }

  const file = new File({
    name: req.body.name,
    mime: req.body.mime,
    owner: req.body.owner,
  });
  await file.save();

  res.status(201).send(file);
});

router.delete("/:id", validateId, async (req, res) => {
  const file = await File.findByIdAndDelete(req.params.id).lean();
  if (!file)
    return res.status(404).send("There is no category with the given ID");

  try {
    await deleteFile(`${file.owner}_${file.name}`);
  } catch (error) {
    console.log(error);
  }
  res.status(200).send(file);
});

router.get("/link/:id", async (req, res) => {
  const file = await File.findById(req.params.id).lean();
  try {
    const link = await getFile(`${file.owner}_${file.name}`);
    res.status(200).send(link);
  } catch (error) {
    res.status(500).send("Couldn't get file");
  }
});

module.exports = router;
