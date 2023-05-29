import { Router } from "express";
import * as controllers from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.post("/users", controllers.registerUser);
router.post("/users/login", controllers.loginUser);
router.get("/users/me", protect, controllers.getUser);
router.get("/users/:id", protect, controllers.getUserNameById);



export default router;