const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const { Order, validate } = require("../models/Order");
const validateId = require("../middleware/validateId");
const exchange = require("../helpers/exchange");

router.get("/", async (req, res) => {
  const orders = await Order.find({})
    .populate("client createdBy statusHistory.by")
    .lean();
  res.status(200).send(orders);
});

router.get("/:id", validateId, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("client createdBy statusHistory.by")
    .lean();
  res.status(200).send(order);
});

router.get("/client/:id", validateId, async (req, res) => {
  const orders = await Order.find({ client: req.params.id })
    .populate("client createdBy statusHistory.by")
    .lean();
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
  const order = await Order.findById(req.params.id).populate(
    "client createdBy statusHistory.by"
  );
  if (!order)
    return res.status(404).send("There is no order with the given Id");

  if (order.status === "CANCELED")
    return res.status(400).send("Order is cancelled");

  order.price.paid = parseFloat(order.price.paid) + parseFloat(req.body.paid);
  if (order.price.paid > order.price.payoutTotal)
    return res.status(400).send("Amount larger than order total");
  await order.save();

  res.status(200).send(order);
});

router.post("/:id/status", [admin, validateId], async (req, res) => {
  let order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send("There is no order with the given Id");

  if (order.status === "CANCELED")
    return res.status(400).send("Order is canceled");

  const statuses = [
    "CREATED",
    "ORDERED",
    "RECEIVED",
    "SHIPPED",
    "ARRIVED",
    "COMPLETED",
  ];
  const index = statuses.indexOf(order.status);
  const forward = statuses.indexOf(req.body.status) > index;
  const allowed = [statuses[index - 1], statuses[index + 1]];

  if (!allowed.includes(req.body.status) && req.body.status !== "CANCELED")
    return res.status(400).send("Wrong status");

  order.status = req.body.status;

  if (forward || req.body.status === "CANCELED") {
    order.statusHistory.push({
      to: req.body.status,
      by: req.user._id,
      at: new Date(),
    });
  } else {
    order.statusHistory.pop();
  }
  await order.save();

  order = await Order.findById(order._id)
    .populate("client createdBy statusHistory.by")
    .lean();

  res.status(200).send(order);
});

router.get("/client/:id", async (req, res) => {
  const orders = await Order.find({ client: req.params.id })
    .populate("client createdBy")
    .lean();
  res.status(200).send(orders);
});

module.exports = router;
