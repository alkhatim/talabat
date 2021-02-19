const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
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
});

const Client = mongoose.model("Client", schema);

const validate = function (client) {
  const schema = Joi.object()
    .keys({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.number().min(8).max(10).required(),
    })
    .unknown(false);

  return Joi.validate(client, schema);
};

exports.Client = Client;
exports.validate = validate;
