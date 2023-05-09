import { Router } from "express";
import * as controllers from "../controllers/articleControlller.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();


router.get("/articles", protect, controllers.getArticles);
router.get("/article/:id", protect, controllers.getArticle);
router.post("/articles", protect, controllers.createArticle);
router.put("/articles/:id", protect, controllers.updateArticle);
router.delete("/article/:id", protect, controllers.deleteArticle);
router.get("/all", protect, controllers.getAllArticles);


export default router;
