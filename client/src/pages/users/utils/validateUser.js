import Joi from "joi";

export default (order) => {
  const schema = Joi.object()
    .keys({
      _id: Joi.string().min(24).max(24).allow(""),
      username: Joi.string().min(3).required(),
      phone: Joi.string().min(8).max(12).required(),
      email: Joi.string().required(),
      role: Joi.string().valid("agent", "admin", "cs").required(),
    })
    .unknown(false);

  return Joi.validate(order, schema);
};
