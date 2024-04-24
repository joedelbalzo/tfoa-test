import { Request, Response, NextFunction } from "express";

const restrictAccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const origin = req.headers.origin || req.headers.referer;

  const allowedBases = ["fife-porpoise-xrrg.squarespace.com", "tfoa-test.onrender.com", "localhost:3000", "localhost:5000"];

  const isAllowedOrigin = allowedBases.some((base) => (origin ? origin.includes(base) : false));

  if (isAllowedOrigin) {
    console.log("allowed");
    next();
  } else {
    console.log("denied here.");
    res.status(403).send(`Access Denied: Your ${origin} is not allowed.`);
  }
};

export { restrictAccess };
