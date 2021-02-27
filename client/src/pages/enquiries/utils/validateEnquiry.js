import Joi from "joi";

export default (enquiry) => {
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
