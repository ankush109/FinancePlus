import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/index";

declare module "express" {
  interface Request {
    user?: any;
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized. Please log in." });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.USER_ACCESS_SECRET as string) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      next(createError.Unauthorized());
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    next(createError.Unauthorized());
  }
};

export default authMiddleware;