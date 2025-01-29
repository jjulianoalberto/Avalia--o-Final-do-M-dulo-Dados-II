import { Router } from 'express';
import { followUser, unfollowUser, getFollowers } from '../controllers/followerController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Rota para seguir outro usuário
router.post('/:userId/follow', authenticate, followUser);

// Rota para deixar de seguir outro usuário
router.post('/:userId/unfollow', authenticate, unfollowUser);

// Rota para obter seguidores de um usuário
router.get('/:userId/followers', authenticate, getFollowers);

export default router;

