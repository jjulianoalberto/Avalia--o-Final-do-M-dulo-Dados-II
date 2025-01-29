"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || "secret";
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "No token provided." });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Invalid token format." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret); // Define o tipo do decoded como { id: number }
        req.body.user = { username: decoded.username, id: decoded.id }; // Agora req.user tem um id garantido.
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
exports.authenticate = authenticate;
