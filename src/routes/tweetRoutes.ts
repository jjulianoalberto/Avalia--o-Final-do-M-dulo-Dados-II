import { Router } from "express";
import { createTweet, likeTweet } from "../controllers/tweetController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

// Rotas de criar tweet e curtir tweet, ambas exigem autenticação
router.post("/", authenticate, createTweet);
router.post("/:tweetId/like", authenticate, likeTweet);

export default router;
