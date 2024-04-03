const express = require("express");
const couponRoutes = express.Router();
const couponCodes = require("../db/coupon-codes");
const { restrictAccess } = require("../middleware/coupon-middleware");

couponRoutes.get("/", restrictAccess, async (req, res, next) => {
  try {
    console.log("hey you made it here! let's get some codes. ");
    console.log(couponCodes);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

couponRoutes.get("/:id", restrictAccess, async (req, res, next) => {
  try {
    console.log("you entered a code. i love it. let's go");
    console.log(req.params.id);
    if (couponCodes.includes(req.params.id)) {
      res.status(200).send("success");
    } else {
      res.status(400).send("fail");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = couponRoutes;
