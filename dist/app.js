"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const tweetRoutes_1 = __importDefault(require("./routes/tweetRoutes"));
const likeRoutes_1 = __importDefault(require("./routes/likeRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/users", userRoutes_1.default);
app.use("/api/tweets", tweetRoutes_1.default);
app.use("/api/likes", likeRoutes_1.default);
app.get("/", (req, res) => {
    res.send("GrowTwitter API");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
