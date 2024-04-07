const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../", ".env") });

const couponCodes = [
  `${process.env.COUPON}-01`,
  `${process.env.COUPON}-02`,
  `${process.env.COUPON}-03`,
  `${process.env.COUPON}-04`,
  `${process.env.COUPON}-05`,
  `${process.env.COUPON}-06`,
  `${process.env.COUPON}-07`,
];

module.exports = couponCodes;
