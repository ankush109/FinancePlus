import { Request, Response } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import prisma from "../../prisma/index";
import { DELETE_SUCCESS, ERR_UPDATE, gender, GENDER_SUCCESS, INTERNAL_ERROR, UNAUTHORIZED, USER_DETAILS_SUCCESS, USER_NOT_FOUND, USER_UPDATE_SUCCESS } from "../config/message";

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
          name: true,
          email: true,
          dob: true,
          about: true,
          gender: true,
          password: false,
        },
      });
      if (!user) return ResponseHelper.error(res, USER_NOT_FOUND, 404);
      return ResponseHelper.success(
        res,
        USER_DETAILS_SUCCESS,
        user
      );
    } catch (err) {
      return ResponseHelper.error(res,INTERNAL_ERROR);
    }
  },
  async UpdateUser(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseHelper.error(res, UNAUTHORIZED, 401);
      }
      const user = await prisma.user.findFirst({
        where:{
            id:userId
        }
      })
      if(!user) return ResponseHelper.error(res,USER_NOT_FOUND,404)
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
  async DeleteUserbyId(req:Request,res:Response){
    try{
    const userId = req.params.id
    const user = await prisma.user.findFirst({
        where:{
            id:userId
        }
    })

    if(!user) return ResponseHelper.error(res,USER_NOT_FOUND,404)
    await prisma.user.delete({
        where:{
            id:userId
        }
    })
    return ResponseHelper.success(res,DELETE_SUCCESS)
    }catch(err){
 return ResponseHelper.error(res,INTERNAL_ERROR)
    }
  },
   async UpdateUserById(req:Request,res:Response){
    try{
    const userId = req.params.id
    const user = await prisma.user.findFirst({
        where:{
            id:userId
        }
    })

    if(!user) return ResponseHelper.error(res,USER_NOT_FOUND,404)
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
      USER_UPDATE_SUCCESS,
        updatedUser
      );
  
    }catch(err){
 return ResponseHelper.error(res,INTERNAL_ERROR)
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
      return ResponseHelper.success(
        res,
       USER_DETAILS_SUCCESS,
        user
      );
    } catch (err) {
      return ResponseHelper.error(res, INTERNAL_ERROR);
    }
  },
  async GetAllUsers(_req:Request,res: Response){
    try{
    
      const users = await prisma.user.findMany({
          select: {
          name: true,
          email: true,
          dob: true,
          about: true,
          gender: true,
          password: false,
          id:true,
          age:true
        },
      })
      return ResponseHelper.success(res,USER_DETAILS_SUCCESS,users)
    }catch(err){
  return ResponseHelper.error(res, INTERNAL_ERROR);
    }
  },
    async getGenders(_req:Request,res: Response){
    try{
     
      const genderTypes = gender
      return ResponseHelper.success(res,GENDER_SUCCESS,genderTypes)
    }catch(err){
  return ResponseHelper.error(res, INTERNAL_ERROR);
    }
  }

};

export default UserController;
