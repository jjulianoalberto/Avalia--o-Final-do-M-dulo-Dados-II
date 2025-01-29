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
exports.getFollowers = exports.unfollowUser = exports.followUser = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
// Função para seguir um usuário
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const followUserId = parseInt(req.body.userId, 10);
        const currentUserId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
        // Verifica se o currentUserId existe e é um número
        if (!currentUserId || isNaN(currentUserId)) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        if (isNaN(followUserId)) {
            res.status(400).json({ message: "Invalid user ID." });
            return;
        }
        if (currentUserId === followUserId) {
            res.status(400).json({ message: "Cannot follow yourself." });
            return;
        }
        // Verificar se o relacionamento já existe
        const existingFollow = yield client_1.default.follower.findFirst({
            where: { followerId: currentUserId, followedId: followUserId },
        });
        if (existingFollow) {
            res.status(400).json({ message: "You are already following this user." });
            return;
        }
        // Criar a relação de seguimento
        yield client_1.default.follower.create({
            data: {
                followerId: currentUserId,
                followedId: followUserId,
            },
        });
        res.status(201).json({ message: "User followed successfully." });
    }
    catch (error) {
        console.error("Error following user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.followUser = followUser;
// Função para deixar de seguir um usuário
const unfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const unfollowUserId = parseInt(req.body.userId, 10);
        const currentUserId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
        // Verifica se o currentUserId existe e é um número
        if (!currentUserId || isNaN(currentUserId)) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        if (isNaN(unfollowUserId)) {
            res.status(400).json({ message: "Invalid user ID." });
            return;
        }
        // Verificar se o usuário segue o outro
        const existingFollow = yield client_1.default.follower.findFirst({
            where: { followerId: currentUserId, followedId: unfollowUserId },
        });
        if (!existingFollow) {
            res.status(404).json({ message: "You are not following this user." });
            return;
        }
        // Remover a relação de seguimento
        yield client_1.default.follower.delete({
            where: { id: existingFollow.id },
        });
        res.status(200).json({ message: "User unfollowed successfully." });
    }
    catch (error) {
        console.error("Error unfollowing user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.unfollowUser = unfollowUser;
// Função para obter os seguidores de um usuário
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID." });
            return;
        }
        const followers = yield client_1.default.follower.findMany({
            where: { followedId: userId },
            include: { follower: true },
        });
        res.status(200).json(followers);
    }
    catch (error) {
        console.error("Error fetching followers:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.getFollowers = getFollowers;
