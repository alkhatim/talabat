const express = require("express");
const router = express.Router();
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");

router.use("/orders", ordersRouter)
router.use("/users", usersRouter)

module.exports = router;