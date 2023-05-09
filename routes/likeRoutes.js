import { Router } from "express";
import * as controllers from "../controllers/likeController.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.post("/articles/:articleId/likes", protect, controllers.createLike);
router.get("/articles/:articleId/likes", controllers.getLikesForArticle);
router.delete("/likes/:likeId", protect, controllers.deleteLike);

export default router;
