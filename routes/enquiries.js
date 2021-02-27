const express = require("express");
const router = express.Router();
const { Enquiry, validate } = require("../models/Enquiry");
const validateId = require("../middleware/validateId");

router.get("/", async (req, res) => {
  const query = {};
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  const enquiries = await Enquiry.find(query)
    .populate("createdBy comments.createdBy")
    .lean();
  res.status(200).send(enquiries);
});

router.get("/:id", validateId, async (req, res) => {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  const enquiry = await Enquiry.findOne(query)
    .populate("createdBy comments.createdBy")
    .lean();
  if (!enquiry) return res.status(404).send("No enquiry with the given Id");

  res.status(200).send(enquiry);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const enquiry = new Enquiry(req.body);
  enquiry.createdBy = req.user._id;

  await enquiry.save();

  res.status(201).send(enquiry);
});

router.put("/:id", validateId, async (req, res) => {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  let enquiry = await Enquiry.findOne(query);
  if (!enquiry)
    return res.status(404).send("There is no enquiry with the given Id");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate("createdBy")
    .lean();

  res.status(200).send(enquiry);
});

router.delete("/:id", validateId, async (req, res) => {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  const enquiry = await Enquiry.findOneAndDelete(query).lean();
  if (!enquiry)
    return res.status(404).send("There is no enquiry with the given ID");

  res.status(200).send(enquiry);
});

router.post("/:id/comment", validateId, async (req, res) => {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  let enquiry = await Enquiry.findById(query).lean();
  if (!enquiry)
    return res.status(404).send("There is no enquiry with the given ID");

  enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          comment: req.body.comment,
          createdBy: req.user._id,
        },
      },
    },
    { new: true }
  )
    .populate("createdBy comments.createdBy")
    .lean();

  res.status(200).send(enquiry);
});

router.delete("/:id/comment/:commentId", validateId, async (req, res) => {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.createdBy = req.user._id;

  let enquiry = await Enquiry.findById(query).lean();
  if (!enquiry)
    return res.status(404).send("There is no enquiry with the given ID");

  enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        comments: {
          _id: req.params.commentId,
        },
      },
    },
    { new: true }
  )
    .populate("createdBy comments.createdBy")
    .lean();

  res.status(200).send(enquiry);
});

module.exports = router;
