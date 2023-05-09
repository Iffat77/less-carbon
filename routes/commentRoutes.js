import { Router } from "express";
import * as controllers from "../controllers/commentController.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.get("/articles/:articleId/comments", controllers.getCommentsByArticle);
router.post("/articles/:articleId/comments", protect, controllers.createCommentForArticle);
router.put("/comments/:commentId", protect, controllers.updateCommentForArticle);
router.delete("/comments/:commentId", protect, controllers.deleteCommentForArticle);

export default router;
