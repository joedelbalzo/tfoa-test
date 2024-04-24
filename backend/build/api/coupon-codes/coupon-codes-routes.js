"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coupon_codes_1 = __importDefault(require("../../db/coupon-codes/coupon-codes")); // Assuming this will also be converted to TypeScript
// import { restrictAccess } from "../../middleware/coupon-middleware"; // Ensure this is properly exported in TypeScript
const couponRoutes = express_1.default.Router();
couponRoutes.get("/", async (req, res, next) => {
    try {
        console.log("get codes!");
        res.send(coupon_codes_1.default);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
couponRoutes.get("/:id", async (req, res, next) => {
    try {
        console.log("you entered a code. does it work?");
        if (coupon_codes_1.default.includes(req.params.id)) {
            res.status(200).send("success");
        }
        else {
            res.status(400).send("fail");
        }
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
exports.default = couponRoutes;
//# sourceMappingURL=coupon-codes-routes.js.map