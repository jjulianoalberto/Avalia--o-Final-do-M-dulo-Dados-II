"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetController_1 = require("../controllers/tweetController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rota para criar um tweet
router.post("/", authMiddleware_1.authenticate, tweetController_1.createTweet);
// Rota para curtir um tweet
router.post("/:tweetId/like", authMiddleware_1.authenticate, tweetController_1.likeTweet);
exports.default = router;
