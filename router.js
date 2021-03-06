const express = require("express");
const router = express.Router();
const auth = require("./middleware/auth");
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const clientsRouter = require("./routes/clients");
const filesRouter = require("./routes/files");
const categoriesRouter = require("./routes/categories");
const ratesRouter = require("./routes/rates");
const enquiriesRouter = require("./routes/enquiries");
const dashboardRouter = require("./routes/dashboard");

router.use(auth);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);
router.use("/clients", clientsRouter);
router.use("/files", filesRouter);
router.use("/categories", categoriesRouter);
router.use("/rates", ratesRouter);
router.use("/enquiries", enquiriesRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
