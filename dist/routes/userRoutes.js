"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControler_1 = require("../controllers/userControler");
const router = express_1.default.Router();
router.post("/register", userControler_1.createUser);
router.post("/login", userControler_1.loginUser);
exports.default = router;
