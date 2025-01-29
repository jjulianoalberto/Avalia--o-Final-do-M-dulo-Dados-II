"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetController_1 = require("../controllers/tweetController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.auth, tweetController_1.createTweet);
router.get("/", authMiddleware_1.auth, tweetController_1.getTweets);
exports.default = router;
