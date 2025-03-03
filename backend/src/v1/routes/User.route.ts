import express, { type Router } from "express";
import { UserController } from "../controllers";

import { authMiddleware } from "../middlewares";
const router: Router = express.Router();

router.get("/user-details",authMiddleware, UserController.GetUser);
router.patch("/user-details",authMiddleware, UserController.UpdateUser);

router.get("/:id",UserController.GetUserById)
router.delete("/:id",UserController.DeleteUserbyId)
router.patch("/:id",UserController.UpdateUserById)


export default router;
