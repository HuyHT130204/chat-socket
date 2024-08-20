import express from "express";
import { getMessasges, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

router.get("/:id", protectRoute, getMessasges);
router.post("/send/:id", protectRoute, sendMessage);

export default router;