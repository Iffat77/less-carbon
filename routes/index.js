import { Router } from "express";
import userRoutes from "./userRoutes.js";
import wallRoutes from "./wallRoutes.js";


const router = Router();

router.get("/", (req, res) => res.send("This is the API root!"));

router.use("/", userRoutes);
router.use("/", wallRoutes);

export default router;


