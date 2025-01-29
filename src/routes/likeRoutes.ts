import { Router } from "express";
import { createTweet, likeTweet } from "../controllers/tweetController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

// Rota para criar um tweet
router.post("/", authenticate, createTweet);

// Rota para curtir um tweet
router.post("/:tweetId/like", authenticate, likeTweet);

export default router;
