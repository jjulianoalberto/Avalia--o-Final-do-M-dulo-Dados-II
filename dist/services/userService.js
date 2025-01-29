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
exports.generateAuthToken = exports.validatePassword = exports.findUserByUsername = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const createUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        return user;
    }
    catch (error) {
        throw new Error("Error creating user");
    }
});
exports.createUser = createUser;
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { username },
        });
        return user;
    }
    catch (error) {
        throw new Error("Error finding user");
    }
});
exports.findUserByUsername = findUserByUsername;
const validatePassword = (inputPassword, storedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcryptjs_1.default.compare(inputPassword, storedPassword);
    }
    catch (error) {
        throw new Error("Error validating password");
    }
});
exports.validatePassword = validatePassword;
const generateAuthToken = (userId, username) => {
    try {
        return jsonwebtoken_1.default.sign({ id: userId, username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
    }
    catch (error) {
        throw new Error("Error generating token");
    }
};
exports.generateAuthToken = generateAuthToken;
