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

app.use(express.static("client/build"));

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use(authMiddleware);
app.use("/api/v1", router);

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(process.env.NODE_PORT, () =>
  console.log("listening on port", process.env.NODE_PORT)
);
