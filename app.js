const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const couponCodes = require("./coupon-codes");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const restrictAccess = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer;

  const allowedOrigins = [
    "https://fife-porpoise-xrrg.squarespace.com",
    "https://tfoa-test.onrender.com",
    "http://localhost:3000",
    "http://localhost:5000",
  ];

  if (origin && allowedOrigins.some((allowedOrigin) => origin.startsWith(allowedOrigin))) {
    res.send(`Access granted for origin: ${origin}`);
  } else {
    res.status(403).send(`Access Denied: The origin ${origin || "undefined"} is not allowed access.`);
  }
};

app.get("/api/coupon-codes", restrictAccess, async (req, res, next) => {
  try {
    console.log("hey you made it here! let's get some codes. ");
    console.log(couponCodes);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get("/api/coupon-codes/:id", restrictAccess, async (req, res, next) => {
  try {
    console.log("you entered a code. i love it. let's go");
    console.log(req.params.id);
    if (couponCodes.includes(req.params.id)) {
      console.log("ding ding ding!");
    } else {
      console.log("fail");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const init = async () => {
  try {
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
