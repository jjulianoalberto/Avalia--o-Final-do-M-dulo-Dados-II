import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRotes";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import likeRoutes from "./routes/likeRoutes";
import followerRoutes from "./routes/followerRoutes";
import replyRoutes from "./routes/replyRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tweets", tweetRoutes);
app.use("/likes", likeRoutes);
app.use("/followers", followerRoutes);
app.use("/replies", replyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
