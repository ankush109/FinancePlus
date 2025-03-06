import { Request, Response } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import prisma from "../../prisma/index";
import {
  DELETE_SUCCESS,
  ERR_UPDATE,
  gender,
  GENDER_SUCCESS,
  INTERNAL_ERROR,
  UNAUTHORIZED,
  USER_DETAILS_SUCCESS,
  USER_NOT_FOUND,
  USER_UPDATE_SUCCESS,
} from "../config/message";
import { Gender } from "@prisma/client";

declare module "express" {
  interface Request {
    user?: any;
  }
}
const UserController = {
  async GetUser(req: Request, res: Response) {
    try {
      const userId = req.user.id;

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          age: true,
          name: true,
          email: true,
          dob: true,
          about: true,
          gender: true,
          password: false,
        },
      });
      if (!user) return ResponseHelper.error(res, USER_NOT_FOUND, 404);
      return ResponseHelper.success(res, USER_DETAILS_SUCCESS, user);
    } catch (err) {
      return ResponseHelper.error(res, INTERNAL_ERROR);
    }
  },
  async UpdateUser(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseHelper.error(res, UNAUTHORIZED, 401);
      }
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!user) return ResponseHelper.error(res, USER_NOT_FOUND, 404);
      const updatedUserData = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updatedUserData,
        select: {
          name: true,
          email: true,
          dob: true,
          about: true,
          gender: true,
          password: false,
        },
      });

      return ResponseHelper.success(
        res,
        "User updated successfully",
        updatedUser
      );
    } catch (err) {
      return ResponseHelper.error(res, ERR_UPDATE, 500);
    }
  },
  async DeleteUserbyId(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) return ResponseHelper.error(res, USER_NOT_FOUND, 404);
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return ResponseHelper.success(res, DELETE_SUCCESS);
    } catch (err) {
      return ResponseHelper.error(res, INTERNAL_ERROR);
    }
  },
  async UpdateUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) return ResponseHelper.error(res, USER_NOT_FOUND, 404);
      const updatedUserData = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updatedUserData,
        select: {
          name: true,
          email: true,
          dob: true,
          about: true,
          gender: true,
          password: false,
        },
      });

      return ResponseHelper.success(res, USER_UPDATE_SUCCESS, updatedUser);
    } catch (err) {
      return ResponseHelper.error(res, INTERNAL_ERROR);
    }
  },
  async GetUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      console.log(userId);

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          name: true,
          email: true,
          dob: true,
          about: true,
          gender: true,
          password: false,
        },
      });

      if (!user) return ResponseHelper.error(res, USER_NOT_FOUND, 404);
      return ResponseHelper.success(res, USER_DETAILS_SUCCESS, user);
    } catch (err) {
      return ResponseHelper.error(res, INTERNAL_ERROR);
    }
  },
  async GetAllUsers(req: Request, res: Response) {
    try {
      const { sort, gender, search,page=1 } = req.query;

      const current_page = parseInt(page as string) - 1
      const ITEMS_PER_PAGE = 10
      const order = sort === "desc" ? "desc" : "asc";
      console.log(current_page,"current_page")
      let genderFilter: Gender | undefined;
      if (
        typeof gender === "string" &&
        Object.values(Gender).includes(gender as Gender)
      ) {
        genderFilter = gender as Gender;
      }

      let whereCondition: any = {};

      const trimmedSearch = typeof search === "string" ? search.trim() : "";
    
      if (trimmedSearch) {
        console.log("in condition")
        whereCondition.OR = [
          { name: { contains: trimmedSearch, mode: "insensitive" } },
          { email: { contains: trimmedSearch, mode: "insensitive" } },
        ]
         console.log(whereCondition.OR[0].name,"where condition")
      }

      if (genderFilter) {
        whereCondition.gender = genderFilter;
      }
     const totalUsers = await prisma.user.findMany()
     const totalUserCount = Math.ceil(totalUsers.length/ITEMS_PER_PAGE)
      const users = await prisma.user.findMany({
        select: {
          name: true,
          email: true,
          dob: true,
          about: true,
          gender: true,
          id: true,
          age: true,
        },
        where: whereCondition,
        take:ITEMS_PER_PAGE,
      skip:current_page*ITEMS_PER_PAGE,
        orderBy: {
          age: order,
        },
      });

      return ResponseHelper.success(res, USER_DETAILS_SUCCESS, {
        users:users,
        totalPageCount:totalUserCount
      });
    } catch (err) {
      console.log(err,"Erre")
      return ResponseHelper.error(res, INTERNAL_ERROR);
    }
  },

  async getGenders(_req: Request, res: Response) {
    try {
      const genderTypes = gender;
      return ResponseHelper.success(res, GENDER_SUCCESS, genderTypes);
    } catch (err) {
      return ResponseHelper.error(res, INTERNAL_ERROR);
    }
  },
};

export default UserController;
