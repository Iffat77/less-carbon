import { Router } from "express";
import * as controllers from "../controllers/categoryController.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", controllers.getCategories);
router.get("/:categoryId", controllers.getCategoryById);
router.post("/", protect, controllers.createCategory);
router.put("/:categoryId", protect, controllers.updateCategory);
router.delete("/:categoryId", protect, controllers.deleteCategory);

export default router;
