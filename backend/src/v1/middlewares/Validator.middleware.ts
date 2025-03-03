import { Request, Response, NextFunction } from "express";


export const validateRequest =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
     return next();
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
  };
