import { Router } from "express";
import userRoutes from "./userRoutes.js";
import articleRoutes from "./articleRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import likeRoutes from "./likeRoutes.js";
import commentRoutes from "./commentRoutes.js";
  
const router = Router();

router.get("/", (req, res) => res.send("This is the API root!"))

router.use("/", userRoutes)
router.use("/", articleRoutes)
router.use("/", categoryRoutes)
router.use("/", likeRoutes)
router.use("/", commentRoutes)


export default router;


