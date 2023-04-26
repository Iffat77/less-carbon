import { Router } from "express";
import * as controllers from "../controllers/wallControlller.js";


const router = Router();

router.get("/walls", controllers.getWalls);
router.get("/walls/:id", controllers.getWall);
router.post("/walls", controllers.createWall);
router.put("/walls/:id", controllers.updateWall);
router.delete("/walls/:id", controllers.deleteWall);

// Add a new thread to a wall
router.post("/walls/:id/threads", controllers.addThreadToWall);

export default router;