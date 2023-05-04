import { Router } from "express";
import * as controllers from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.get("/posts/thread/:threadId", protect, controllers.getPostsForThread);
router.get("/posts/:id", protect, controllers.getPostById);
router.post("/posts", protect, controllers.createPost );
router.put("/posts/:id", protect, controllers.updatePost);
router.delete("/posts/:id", protect, controllers.deletePost);

export default router;
