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
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeTweet = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const likeTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = parseInt(req.params.tweetId);
    const { id: userId } = req.user;
    try {
        const existingLike = yield prisma.like.findUnique({
            where: {
                userId_tweetId: {
                    userId,
                    tweetId,
                },
            },
        });
        if (existingLike) {
            return res.status(400).json({ error: "You already liked this tweet" });
        }
        const like = yield prisma.like.create({
            data: {
                userId,
                tweetId,
            },
        });
        res.status(201).json(like);
    }
    catch (error) {
        res.status(500).json({ error: "Error liking tweet" });
    }
});
exports.likeTweet = likeTweet;
