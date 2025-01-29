"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../../prisma/client"));
// Controller para criar um novo usuário
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    // Validação de entrada
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: "Todos os campos são obrigatórios." });
    }
    try {
        // Verificar se o email ou username já estão em uso
        const existingUser = yield client_1.default.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email ou username já estão em uso." });
        }
        // Hash da senha
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Criar o usuário no banco de dados
        const newUser = yield client_1.default.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        // Retornar resposta (sem expor a senha)
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }
});
exports.createUser = createUser;
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield client_1.default.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users." });
    }
});
exports.getAllUsers = getAllUsers;
