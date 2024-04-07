const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const couponRoutes = require("./api/coupon-codes/coupon-codes-routes");
const { restrictAccess } = require("./middleware/coupon-middleware");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.use("/api/coupon-codes", restrictAccess, couponRoutes);

module.exports = app;
