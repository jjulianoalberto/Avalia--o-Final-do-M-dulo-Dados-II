import express from "express";
import { getAllUsers } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = express.Router();

router.get("/", authenticateToken, getAllUsers); // Rota protegida para listar usuários

export default router;
