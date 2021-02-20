const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/auth");
const authRouter = require("./routes/auth");
const router = require("./router");

mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((e) => console.error(e));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use(authMiddleware);
app.use("/api/v1", router);

app.listen(process.env.PORT, () => console.log("listening on port", port));
