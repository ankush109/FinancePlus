import { Request, Response } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import prisma from "../../prisma/index";

declare module "express" {
  interface Request {
    user?: any;
  }
}
const UserController = {
  async GetUser(req: Request, res: Response) {
    try {
      const userId = req.user.id;
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
      if (!user) return ResponseHelper.error(res, "User not found!", 404);
      return ResponseHelper.success(
        res,
        "user details fetched successfully",
        user
      );
    } catch (err) {
      return ResponseHelper.error(res, "erre");
    }
  },
  async UpdateUser(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseHelper.error(res, "Unauthorized", 401);
      }
      const user = await prisma.user.findFirst({
        where:{
            id:userId
        }
      })
      if(!user) return ResponseHelper.error(res,"User not found",404)
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
      return ResponseHelper.error(res, "Error updating user", 500);
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

    if(!user) return ResponseHelper.error(res,"User not found!",404)
    await prisma.user.delete({
        where:{
            id:userId
        }
    })
    return ResponseHelper.success(res,"User deleted successfully")
    }catch(err){
 return ResponseHelper.error(res,"Interal server err")
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

    if(!user) return ResponseHelper.error(res,"User not found!",404)
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
  
    }catch(err){
 return ResponseHelper.error(res,"Interal server err")
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
      console.log(user,"user")
      if (!user) return ResponseHelper.error(res, "User not found!", 404);
      return ResponseHelper.success(
        res,
        "user details fetched successfully",
        user
      );
    } catch (err) {
      return ResponseHelper.error(res, "erre");
    }
  },
};

export default UserController;
