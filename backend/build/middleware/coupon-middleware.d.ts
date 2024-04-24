import { Request, Response, NextFunction } from "express";
declare const restrictAccess: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { restrictAccess };
