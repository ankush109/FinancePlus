import express, { type Router } from "express";
import { UserController } from "../controllers";

import { authMiddleware } from "../middlewares";
const router: Router = express.Router();

router.get("/user-details",authMiddleware, UserController.GetUser);
router.patch("/user-details",authMiddleware, UserController.UpdateUser);
router.get("/get-users",UserController.GetAllUsers)
router.get("/get-genders",UserController.getGenders)
router.get("/:id",UserController.GetUserById)
router.delete("/:id",UserController.DeleteUserbyId)
router.patch("/:id",UserController.UpdateUserById)
router.post("/forgot-password",UserController.ResetPassword)
router.post("/reset-password/:token",UserController.ChangePassword)


export default router;
