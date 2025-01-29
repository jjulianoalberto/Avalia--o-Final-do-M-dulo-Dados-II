"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const replyController_1 = require("../controllers/replyController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authenticate, replyController_1.replyToTweet);
exports.default = router;
