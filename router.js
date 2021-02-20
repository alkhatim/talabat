const express = require("express");
const router = express.Router();
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const clientsRouter = require("./routes/clients");

router.use("/orders", ordersRouter)
router.use("/users", usersRouter)
router.use("/clients", clientsRouter);

module.exports = router;