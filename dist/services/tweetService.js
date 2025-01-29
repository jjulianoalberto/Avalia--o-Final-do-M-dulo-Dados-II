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
exports.getTweets = exports.createTweet = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTweet = (content, type, userId, replyToId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweet = yield prisma.tweet.create({
            data: {
                content,
                type,
                userId,
                replyToId,
            },
        });
        return tweet;
    }
    catch (error) {
        throw new Error("Error creating tweet");
    }
});
exports.createTweet = createTweet;
const getTweets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweets = yield prisma.tweet.findMany({
            include: {
                user: true,
                likes: true,
                replies: true,
            },
        });
        return tweets;
    }
    catch (error) {
        throw new Error("Error fetching tweets");
    }
});
exports.getTweets = getTweets;
