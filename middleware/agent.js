module.exports = function (req, res, next) {
  if (req.user.role !== "admin" && req.user.role !== "agent")
    return res.status(403).send("You don't have the required permissions");
  next();
};
