import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import couponRoutes from "./api/coupon-codes/coupon-codes-routes";
// import { restrictAccess } from './middleware/coupon-middleware';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(
  "/api/coupon-codes",
  // restrictAccess,
  couponRoutes
);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

export default app;
