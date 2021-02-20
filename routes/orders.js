const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const { Order, validate } = require("../models/Order");
const validateId = require("../middleware/validateId");
const exchange = require("../helpers/exchange");

router.get("/", async (req, res) => {
  const orders = await Order.find({ status: { $ne: "CANCELED" } })
    .populate("client createdBy")
    .lean();
  res.status(200).send(orders.map((order) => order));
});

router.get("/all", async (req, res) => {
  const orders = await Order.find({}).populate("client createdBy").lean();
  res.status(200).send(orders.map((order) => order));
});

router.get("/:id", validateId, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("client createdBy")
    .lean();
  res.status(200).send(order);
});

router.get("/client/:id", validateId, async (req, res) => {
  const orders = await Order.find({ client: req.params.id }).lean();
  res.status(200).send(orders);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rate = await mongoose.connection
    .collection("config")
    .findOne({ name: "rates" });

  if (!rate) return res.status(500).send("The currency rates are missing");

  const {
    itemPrice,
    deliveryPrice,
    shippingPrice,
    itemCurrency,
    profit,
    payoutCurrency,
  } = req.body.price;
  const payoutTotal =
    exchange(itemPrice, itemCurrency, payoutCurrency, rate) +
    exchange(deliveryPrice, itemCurrency, payoutCurrency, rate) +
    exchange(shippingPrice, itemCurrency, payoutCurrency, rate) +
    exchange(profit, "USD", payoutCurrency, rate);

  req.body.createdBy = req.user._id;
  req.body.price.payoutTotal = payoutTotal;

  const order = new Order(req.body);

  await order.save();

  res.status(201).send(order);
});

router.put("/:id", validateId, async (req, res) => {
  let order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send("There is no order with the given Id");

  if (order.status !== "CREATED")
    return res.status(400).send("Can't edit a processed order");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rate = await mongoose.connection
    .collection("config")
    .findOne({ name: "rates" });

  if (!rate) return res.status(500).send("The currency rates are missing");

  const {
    itemPrice,
    deliveryPrice,
    shippingPrice,
    itemCurrency,
    profit,
    payoutCurrency,
  } = req.body.price;
  const payoutTotal =
    exchange(itemPrice, itemCurrency, payoutCurrency, rate) +
    exchange(deliveryPrice, itemCurrency, payoutCurrency, rate) +
    exchange(shippingPrice, itemCurrency, payoutCurrency, rate) +
    exchange(profit, "USD", payoutCurrency, rate);

  req.body.price.payoutTotal = payoutTotal;
  req.body.updatedBy = req.user._id;
  req.body.updatedAt = new Date();

  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).lean();

  res.status(200).send(order);
});

router.post("/:id/pay", [admin, validateId], async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send("There is no order with the given Id");

  if (order.status === "CANCELED")
    return res.status(400).send("Order is cancelled");

  order.price.paid = req.body.paid;
  await order.save();

  res.status(200).send(order);
});

router.post("/:id/status", [admin, validateId], async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send("There is no order with the given Id");

  let allowed;
  switch (req.body.status) {
    case "CREATED":
      allowed = ["ORDERED"];
      break;
    case "ORDERED":
      allowed = ["CREATED", "RECEIVED"];
      break;
    case "RECEIVED":
      allowed = ["ORDERED", "SHIPPED"];
      break;
    case "SHIPPED":
      allowed = ["RECEIVED", "ARRIVED"];
      break;
    case "ARRIVED":
      allowed = ["SHIPPED", "COMPLETED"];
      break;
    case "COMPLETED":
      allowed = ["ARRIVED"];
      break;
    default:
      allowed = [];
      break;
  }

  if (!allowed.includes(order.status) && req.body.status !== "CANCELED")
    return res.status(400).send("Wrong status");

  order.status = req.body.status;
  order.statusHistory.push({
    to: req.body.status,
    by: req.user._id,
    at: new Date(),
  });
  await order.save();

  res.status(200).send(order);
});

module.exports = router;
