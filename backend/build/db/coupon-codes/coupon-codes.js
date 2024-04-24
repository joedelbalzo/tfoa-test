"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../", ".env") });
const couponCodes = [
    `${process.env.COUPON}-01`,
    `${process.env.COUPON}-02`,
    `${process.env.COUPON}-03`,
    `${process.env.COUPON}-04`,
    `${process.env.COUPON}-05`,
    `${process.env.COUPON}-06`,
    `${process.env.COUPON}-07`,
];
exports.default = couponCodes;
//# sourceMappingURL=coupon-codes.js.map