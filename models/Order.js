const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Client",
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "CREATED",
      "ORDERED",
      "RECEIVED",
      "SHIPPED",
      "ARRIVED",
      "COMPLETED",
      "CANCELED",
    ],
    required: true,
    default: "CREATED",
  },
  delivery: {
    type: String,
    enum: ["FULL", "PICKUP"],
    required: true,
  },
  isUrgent: Boolean,
  price: {
    itemPrice: { type: Number, required: true },
    deliveryPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    itemCurrency: {
      type: String,
      enum: ["USD", "SDG", "AED", "SAR"],
      required: true,
    },
    profit: { type: Number, required: true },
    payoutTotal: { type: Number, required: true },
    payoutCurrency: {
      type: String,
      enum: ["USD", "SDG", "AED", "SAR"],
      required: true,
    },
    paid: Number,
  },
  address: String,
  notes: String,
  link: String,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },
  updatedAt: Date,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
  },
  statusHistory: { type: [{ to: String, by: String, at: Date }], default: [] },
});

const Order = mongoose.model("Order", schema);

const validate = function (order) {
  const schema = Joi.object()
    .keys({
      _id: Joi.string().min(24).max(24).allow(""),
      client: Joi.string().min(24).max(24).required(),
      orderNumber: Joi.string().min(4).max(10).required(),
      category: Joi.string().required(),
      description: Joi.string().min(3).max(256).required(),
      delivery: Joi.string().valid("FULL", "PICKUP").required(),
      address: Joi.string().allow(""),
      notes: Joi.string().allow(""),
      link: Joi.string().allow(""),
      isUrgent: Joi.boolean(),
      price: Joi.object()
        .keys({
          itemPrice: Joi.number().required(),
          deliveryPrice: Joi.number().required(),
          shippingPrice: Joi.number().required(),
          itemCurrency: Joi.string()
            .valid("USD", "SDG", "AED", "SAR")
            .required(),
          profit: Joi.number().required(),
          payoutCurrency: Joi.string()
            .valid("USD", "SDG", "AED", "SAR")
            .required(),
        })
        .unknown(true),
    })
    .unknown(true);

  return Joi.validate(order, schema);
};

exports.Order = Order;
exports.validate = validate;
