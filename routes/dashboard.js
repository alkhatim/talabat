const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const { Order } = require("../models/Order");
const { Enquiry } = require("../models/Enquiry");
const exchange = require("../helpers/exchange");

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
  const arrivedOrders = await Order.count({
    status: "ARRIVED",
  });
  const newEnquiries = await Enquiry.count({
    status: "NEW",
  });

  res
    .status(200)
    .send({ lateOrders, receivedOrders, arrivedOrders, newEnquiries });
});

router.get("/categories", async (req, res) => {
  const categories = await Order.aggregate([
    { $match: { status: { $ne: "CANCELED" } } },
    { $group: { _id: "$category", value: { $sum: 1 } } },
    { $project: { _id: 0, name: "$_id", value: 1 } },
  ]);
  res.status(200).send(categories);
});

router.get("/payment", async (req, res) => {
  const rate = await mongoose.connection
    .collection("config")
    .findOne({ name: "rates" });

  if (!rate) return res.status(500).send("The currency rates are missing");

  let orders = await Order.find({ status: { $ne: "CANCELED" } })
    .select("price")
    .lean();

  orders = orders.map((order) => ({
    total: exchange(
      order.price.payoutTotal,
      order.price.payoutCurrency,
      "USD",
      rate
    ),
    paid: exchange(order.price.paid, order.price.payoutCurrency, "USD", rate),
    profit: exchange(order.price.profit, order.price.itemCurrency, "USD", rate),
  }));

  const payment = [
    orders.reduce((prev, curr) => (prev += curr.total), 0),
    orders.reduce((prev, curr) => (prev += curr.paid), 0),
    orders.reduce((prev, curr) => (prev += curr.profit), 0),
  ];
  res.status(200).send(payment);
});

module.exports = router;
