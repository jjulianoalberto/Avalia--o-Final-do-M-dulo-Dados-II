import { Router } from "express";
import { replyToTweet } from "../controllers/replyController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticate, replyToTweet);

export default router;
