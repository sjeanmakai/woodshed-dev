const express = require("express");
//const MongoClient = require('mongodb', { useUnifiedTopology: true }).MongoClient;
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
global.config = require("./config/config");
const db = require("./config/db");
const verifyToken = require("./middlewares/verifyToken");
var cookieParser = require("cookie-parser");
app.use(cookieParser()); // parses the cookies
app.use(bodyParser.json()); // parses application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  app.use("/weekly", verifyToken);
  app.use("/daily", verifyToken);
  app.use('/fa', express.static(__dirname + '/node_modules/font-awesome/css'));
  app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts'));
  next();
});

const mongoose = require("mongoose");
mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true });
const dBase = mongoose.connection;
dBase.on("error", console.error.bind(console, "connection error:"));
dBase.once("open", function () {
  console.log("Connected to MongoDB");
  require("./routes")(app);
  app.listen(port, () => {
    console.log("We are live on " + port);
  });
});
