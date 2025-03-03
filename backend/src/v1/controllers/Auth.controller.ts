import { type NextFunction, type Request, type Response } from "express";
import createError from "http-errors";
import prisma from "../../prisma/index";
import bcrypt from "bcrypt";
import ResponseHelper from "../../helpers/ResponseHelper";
import jwt from "jsonwebtoken";
const AuthController = {
  async Register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { name, age, dob, password, gender, about,   email } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      if (user)
        return res.status(400).json({
          success: false,
          message: "User with email already exists!",
        });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userData = {
        name,
        age,
        dob,
        password: hashedPassword,
        gender,
        about,
        email,
      };
      const newUser = await prisma.user.create({
        data: userData,
      });

      const { password: _, ...userWithoutPassword } = newUser;
      return ResponseHelper.success(
        res,
        "user registered Successfully!",
        userWithoutPassword
      );
    } catch (err) {
      next(createError.InternalServerError());
    }
  },
  async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      console.log(user, "user");
      if (!user) return ResponseHelper.error(res, "Invalid credentials");
      const isPasswordMatch = await bcrypt.compare(password, user?.password);
      if (!isPasswordMatch)
        return ResponseHelper.error(res, "Invalid Credentials", 401);

      if (!process.env.USER_ACCESS_SECRET) {
        throw new Error("Missing USER_SECRET in environment variables");
      }

      const accessToken = jwt.sign({ id: user.id }, process.env.USER_ACCESS_SECRET, {
        expiresIn: "1h",
      });
      return ResponseHelper.success(
        res,
        "user logged in successfully",
        {
          accessToken: accessToken,
        },
        200
      );
    } catch (err) {
      return ResponseHelper.error(res, "Internal server error", 400);
    }
  },
};

export default AuthController;
