const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const router = require("./router");
const path = require("path");
const NODE_ENV = process.env.NODE_ENV;

mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((e) => console.error(e));

  if (NODE_ENV === "production") app.use(express.static("client/build"));

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", router);

if (NODE_ENV === "production")
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err);
  });

app.listen(process.env.NODE_PORT, () =>
  console.log("listening on port", process.env.NODE_PORT)
);
