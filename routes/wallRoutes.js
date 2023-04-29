import { Router } from "express";
import * as controllers from "../controllers/wallControlller.js";
import protect from "../middleware/authMiddleware.js";


const router = Router();
// getProfileWalls
router.get("/walls", protect, controllers.getWalls);
router.get("/walls/:id", protect, controllers.getWall);
router.post("/walls", protect, controllers.createWall);
router.put("/walls/:id", protect, controllers.updateWall);
router.delete("/walls/:id", protect, controllers.deleteWall);

// Add a new thread to a wall
router.post("/walls/:id/threads", controllers.addThreadToWall);


// Logged In User 

export default router;