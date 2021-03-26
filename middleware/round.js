module.exports = function (req, res, next) {
  if (req.body.itemPrice)
    req.body.itemPrice = Math.round(Number(req.body.itemPrice));
  if (req.body.deliveryPrice)
    req.body.deliveryPrice = Math.round(Number(req.body.deliveryPrice));
  if (req.body.shippingPrice)
    req.body.shippingPrice = Math.round(Number(req.body.shippingPrice));
  if (req.body.profit) req.body.profit = Math.round(Number(req.body.profit));
  if (req.body.paid) req.body.paid = Math.round(Number(req.body.paid));
  next();
};
