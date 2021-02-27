const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  phone2: String,
  address: String,
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
      name: Joi.string().min(3).required(),
      phone: Joi.string().min(8).max(12).required(),
      phone2: Joi.string().min(8).max(12).allow(""),
      address: Joi.string().allow(""),
    })
    .unknown(true);

  return Joi.validate(client, schema);
};

exports.Client = Client;
exports.validate = validate;
