"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Rota para buscar todos os usuários
router.get("/", userController_1.getAllUsers);
// Rota para criar um novo usuário
router.post("/register", userController_1.createUser);
exports.default = router;
