import Joi from "joi";

export default (order) => {
  const schema = Joi.object()
    .keys({
      _id: Joi.string().min(24).max(24).allow(""),
      client: Joi.string().min(24).max(24).required(),
      orderNumber: Joi.string().min(4).required(),
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
