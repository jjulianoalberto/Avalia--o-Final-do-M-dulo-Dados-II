import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser); // Rota para cadastro
router.post("/login", loginUser); // Rota para login

export default router;
