import express, { type Router } from "express";
import { AuthController } from "../controllers";
import { registerSchema ,loginSchema} from "../types/type"; 
import { validateRequest } from "../middlewares/Validator.middleware";
const router: Router = express.Router();

router.post("/register",validateRequest(registerSchema), AuthController.Register);
router.post("/login",validateRequest(loginSchema), AuthController.Login);
export default router;
