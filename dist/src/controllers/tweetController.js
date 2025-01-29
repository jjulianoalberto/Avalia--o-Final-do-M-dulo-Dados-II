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
exports.likeTweet = exports.createTweet = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
// Função para criar um tweet
const createTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, user } = req.body;
        let userId = user === null || user === void 0 ? void 0 : user.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        // Certificando que userId é um número
        userId = Number(userId);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID." });
            return;
        }
        if (!content || content.trim().length === 0) {
            res.status(400).json({ message: "Tweet content cannot be empty." });
            return;
        }
        // Criação do tweet
        yield client_1.default.tweet.create({
            data: {
                content,
                userId,
                type: "T", // "T" para tweet normal
            },
        });
        // Resposta sem retornar Response
        res.status(201).json({ message: "Tweet created successfully." });
    }
    catch (error) {
        console.error("Error creating tweet:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.createTweet = createTweet;
// Função para curtir um tweet
const likeTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tweetId } = req.params;
        const { user } = req.body;
        // Verificar se req.user não é undefined
        if (!user || !user.id) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        const userId = user.id; // Agora userId é seguro
        const tweetIdNumber = parseInt(tweetId, 10);
        if (isNaN(tweetIdNumber)) {
            res.status(400).json({ message: "Invalid tweet ID." });
            return;
        }
        const tweet = yield client_1.default.tweet.findUnique({
            where: { id: tweetIdNumber },
        });
        if (!tweet) {
            res.status(404).json({ message: "Tweet not found." });
            return;
        }
        const existingLike = yield client_1.default.like.findFirst({
            where: { tweetId: tweetIdNumber, userId },
        });
        if (existingLike) {
            res.status(400).json({ message: "Tweet already liked." });
            return;
        }
        yield client_1.default.like.create({
            data: {
                tweetId: tweetIdNumber,
                userId,
            },
        });
        res.status(200).json({ message: "Tweet liked successfully." });
    }
    catch (error) {
        console.error("Error liking tweet:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.likeTweet = likeTweet;
