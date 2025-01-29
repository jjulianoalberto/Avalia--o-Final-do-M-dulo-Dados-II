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
const likeTweet = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
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
            throw new Error("User already liked this tweet");
        }
        const like = yield prisma.like.create({
            data: {
                userId,
                tweetId,
            },
        });
        return like;
    }
    catch (error) {
        throw new Error("Error liking tweet");
    }
});
exports.likeTweet = likeTweet;
