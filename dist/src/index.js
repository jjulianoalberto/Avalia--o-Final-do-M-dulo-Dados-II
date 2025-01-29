"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRotes_1 = __importDefault(require("./routes/authRotes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const tweetRoutes_1 = __importDefault(require("./routes/tweetRoutes"));
const likeRoutes_1 = __importDefault(require("./routes/likeRoutes"));
const followerRoutes_1 = __importDefault(require("./routes/followerRoutes"));
const replyRoutes_1 = __importDefault(require("./routes/replyRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", authRotes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/tweets", tweetRoutes_1.default);
app.use("/likes", likeRoutes_1.default);
app.use("/followers", followerRoutes_1.default);
app.use("/replies", replyRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
