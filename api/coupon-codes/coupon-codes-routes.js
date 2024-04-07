const express = require("express");
const couponRoutes = express.Router();
const couponCodes = require("../../db/coupon-codes/coupon-codes");
const { restrictAccess } = require("../../middleware/coupon-middleware");

couponRoutes.get("/", async (req, res, next) => {
  try {
    console.log("get codes!");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

couponRoutes.get("/:id", async (req, res, next) => {
  try {
    console.log("you entered a code. does it work?");
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
