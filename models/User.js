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
    type: String,
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
      _id: Joi.string().min(24).max(24).allow(""),
      username: Joi.string().min(3).max(50).required(),
      phone: Joi.string().min(8).max(12).required(),
      email: Joi.string().required(),
      role: Joi.string().valid("agent", "admin").required(),
    })
    .unknown(false);

  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validate;
