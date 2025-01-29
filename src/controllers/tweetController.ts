import { Request, Response } from "express";
import prisma from "../../prisma/client";

// Função para criar um tweet
export const createTweet = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content, user } = req.body;
    let userId = user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }

    // Certificando que userId é um número
    userId = Number(userId);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID." });
      return;
    }

    if (!content || content.trim().length === 0) {
      res.status(400).json({ message: "Tweet content cannot be empty." });
      return;
    }

    // Criação do tweet
    await prisma.tweet.create({
      data: {
        content,
        userId,
        type: "T", // "T" para tweet normal
      },
    });

    // Resposta sem retornar Response
    res.status(201).json({ message: "Tweet created successfully." });
  } catch (error) {
    console.error("Error creating tweet:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Função para curtir um tweet
export const likeTweet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tweetId } = req.params;
    const { user } = req.body;

    // Verificar se req.user não é undefined
    if (!user || !user.id) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }

    const userId = user.id; // Agora userId é seguro

    const tweetIdNumber = parseInt(tweetId, 10);
    if (isNaN(tweetIdNumber)) {
      res.status(400).json({ message: "Invalid tweet ID." });
      return;
    }

    const tweet = await prisma.tweet.findUnique({
      where: { id: tweetIdNumber },
    });

    if (!tweet) {
      res.status(404).json({ message: "Tweet not found." });
      return;
    }

    const existingLike = await prisma.like.findFirst({
      where: { tweetId: tweetIdNumber, userId },
    });

    if (existingLike) {
      res.status(400).json({ message: "Tweet already liked." });
      return;
    }

    await prisma.like.create({
      data: {
        tweetId: tweetIdNumber,
        userId,
      },
    });

    res.status(200).json({ message: "Tweet liked successfully." });
  } catch (error) {
    console.error("Error liking tweet:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
