const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["NEW", "ANSWERED"],
    default: "NEW",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  contactMethod: {
    type: String,
    enum: ["FACEBOOK", "INSTAGRAM", "WHATSAPP", "PHONECALL"],
    required: true,
  },
  contactAccount: String,
  description: {
    type: String,
    required: true,
  },
  link: String,
  notes: String,
  comments: [
    {
      comment: String,
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
    },
  ],
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

const Enquiry = mongoose.model("Enquiry", schema);

const validate = function (enquiry) {
  const schema = Joi.object()
    .keys({
      _id: Joi.string().min(24).max(24).allow(""),
      client: Joi.string().min(3).required(),
      status: Joi.string().valid("NEW", "ANSWERED").allow(""),
      phone: Joi.string().min(8).max(12).required(),
      contactMethod: Joi.string()
        .valid("FACEBOOK", "INSTAGRAM", "WHATSAPP", "PHONECALL")
        .required(),
      contactAccount: Joi.string().allow(""),
      description: Joi.string().min(3).required(),
      link: Joi.string().allow(""),
      notes: Joi.string().allow(""),
      comments: Joi.array(),
    })
    .unknown(true);

  return Joi.validate(enquiry, schema);
};

exports.Enquiry = Enquiry;
exports.validate = validate;
