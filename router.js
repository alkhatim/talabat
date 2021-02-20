const express = require("express");
const router = express.Router();
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const clientsRouter = require("./routes/clients");
const categoriesRouter = require("./routes/categories");

router.use("/orders", ordersRouter)
router.use("/users", usersRouter)
router.use("/clients", clientsRouter);
router.use("/categories", categoriesRouter);

module.exports = router;