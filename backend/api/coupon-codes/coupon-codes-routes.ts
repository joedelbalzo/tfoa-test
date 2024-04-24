import express, { Request, Response, NextFunction, Router } from "express";
import couponCodes from "../../db/coupon-codes/coupon-codes"; // Assuming this will also be converted to TypeScript
// import { restrictAccess } from "../../middleware/coupon-middleware"; // Ensure this is properly exported in TypeScript

const couponRoutes: Router = express.Router();

couponRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("get codes!");
    res.send(couponCodes);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

couponRoutes.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("you entered a code. does it work?");
    if (couponCodes.includes(req.params.id)) {
      res.status(200).send("success");
    } else {
      res.status(400).send("fail");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default couponRoutes;
