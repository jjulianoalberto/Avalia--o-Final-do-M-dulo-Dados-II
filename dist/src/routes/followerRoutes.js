"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const followerController_1 = require("../controllers/followerController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rota para seguir outro usuário
router.post('/:userId/follow', authMiddleware_1.authenticate, followerController_1.followUser);
// Rota para deixar de seguir outro usuário
router.post('/:userId/unfollow', authMiddleware_1.authenticate, followerController_1.unfollowUser);
// Rota para obter seguidores de um usuário
router.get('/:userId/followers', authMiddleware_1.authenticate, followerController_1.getFollowers);
exports.default = router;
