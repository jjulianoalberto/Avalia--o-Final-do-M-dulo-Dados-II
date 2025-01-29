"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetController_1 = require("../controllers/tweetController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rotas de criar tweet e curtir tweet, ambas exigem autenticação
router.post("/", authMiddleware_1.authenticate, tweetController_1.createTweet);
router.post("/:tweetId/like", authMiddleware_1.authenticate, tweetController_1.likeTweet);
exports.default = router;
