const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mime: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const File = mongoose.model("File", schema);

const validate = function (file) {
  const schema = Joi.object()
    .keys({
      name: Joi.string().required(),
      mime: Joi.string().required(),
      data: Joi.string().required(),
      owner: Joi.string().min(24).max(24).required(),
    })
    .unknown(true);

  return Joi.validate(file, schema);
};

exports.File = File;
exports.validate = validate;
