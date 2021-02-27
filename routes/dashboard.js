const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const { Order } = require("../models/Order");
const { Enquiry } = require("../models/Enquiry");

router.use(admin);

router.get("/ordersfrequency", async (req, res) => {
  const frequency = await Order.aggregate([
    {
      $match: { createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
    },
    { $group: { _id: { $month: "$createdAt" }, value: { $sum: 1 } } },
    { $project: { _id: 0, month: "$_id", value: 1 } },
  ]);

  res.status(200).send(frequency);
});

router.get("/ordersstatuses", async (req, res) => {
  const status = await Order.aggregate([
    {
      $match: { status: { $ne: "CANCELED" } },
    },
    { $group: { _id: "$status", value: { $sum: 1 } } },
    { $project: { _id: 0, status: "$_id", value: 1 } },
  ]);

  res.status(200).send(status);
});

router.get("/notifications", async (req, res) => {
  const date = new Date().setDate(new Date().getDate() - 2);
  const lateOrders = await Order.count({
    status: { $nin: ["COMPLETED", "CANCELED"] },
    createdAt: { $lt: date },
  });
  const receivedOrders = await Order.count({
    status: "RECEIVED",
  });
  const newEnquiries = await Enquiry.count({
    status: "NEW",
  });

  res.status(200).send({ lateOrders, receivedOrders, newEnquiries });
});

router.get("/categories", async (req, res) => {
  const categories = await Order.aggregate([
    { $match: { status: { $ne: "CANCELED" } } },
    { $group: { _id: "$category", value: { $sum: 1 } } },
    { $project: { _id: 0, name: "$_id", value: 1 } },
  ]);
  res.status(200).send(categories);
});

module.exports = router;
