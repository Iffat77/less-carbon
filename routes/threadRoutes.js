import { Router } from "express";
import * as controllers from "../controllers/threadController.js"
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.get("/threads/wall/:wallId", controllers.getThreadsForWall);
router.get("/thread/:id", controllers.getThread);
router.post("/threads/", protect, controllers.createThread );
router.put("/threads/:id", protect, controllers.updateThread);
router.delete("/threads/:id", protect, controllers.deleteThread);


export default router;