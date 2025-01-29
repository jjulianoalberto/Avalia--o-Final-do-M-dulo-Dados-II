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
exports.unlikeTweet = exports.likeTweet = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
// Função para curtir um tweet
const likeTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tweetId } = req.body;
    const userId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        // Verificar se o like já existe, usando userId e tweetId combinados
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" }); // Verifica se o userId existe
        }
        const existingLike = yield client_1.default.like.findFirst({
            where: {
                userId: userId, // Id do usuário
                tweetId: tweetId, // Id do tweet
            },
        });
        if (existingLike) {
            return res.status(400).json({ error: "You already liked this tweet." });
        }
        // Criar o like
        const like = yield client_1.default.like.create({
            data: {
                userId: userId, // userId como número
                tweetId: tweetId, // tweetId já vindo como número
            },
        });
        res.status(201).json(like);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to like tweet." });
    }
});
exports.likeTweet = likeTweet;
// Função para desfazer o like de um tweet
const unlikeTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tweetId } = req.params;
    const userId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" }); // Verifica se o userId existe
        }
        // Verificar se o like existe
        const existingLike = yield client_1.default.like.findFirst({
            where: {
                userId: userId, // Id do usuário
                tweetId: Number(tweetId), // Conversão de tweetId para número
            },
        });
        // Se o like não existir, retornar erro
        if (!existingLike) {
            return res.status(404).json({ error: "You haven't liked this tweet." });
        }
        // Remover o like
        yield client_1.default.like.delete({
            where: {
                id: existingLike.id, // Usar o id do like para excluí-lo
            },
        });
        res.status(200).json({ message: "Tweet unliked successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to unlike tweet." });
    }
});
exports.unlikeTweet = unlikeTweet;
