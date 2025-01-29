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
exports.replyToTweet = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const replyToTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { content, tweetId } = req.body;
    const userId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        // Verifique se o userId e tweetId existem
        if (!userId || !tweetId) {
            res.status(400).json({ error: "User ID or Tweet ID is missing." });
            return; // Retorna imediatamente após enviar a resposta
        }
        // Criar a resposta para o tweet
        const reply = yield client_1.default.tweet.create({
            data: {
                content,
                userId, // userId como número
                type: "Reply",
                originalTweetId: tweetId, // Referência ao tweet original
            },
        });
        res.status(201).json(reply);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to reply to tweet." });
    }
});
exports.replyToTweet = replyToTweet;
