const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["agent", "admin"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

schema.methods.genJwt = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT
  );
};

const User = mongoose.model("User", schema);

const validate = function (user) {
  const schema = Joi.object()
    .keys({
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(6).max(30).required(),
      phone: Joi.number().min(8).max(10).required(),
      email: Joi.string().required(),
      role: Joi.string().valid("agent", "admin").required(),
    })
    .unknown(false);

  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validate;
