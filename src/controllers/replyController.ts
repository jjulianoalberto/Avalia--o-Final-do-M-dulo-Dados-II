import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const replyToTweet = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { content, tweetId } = req.body;
  const userId = req.body.user?.id;

  try {
    // Verifique se o userId e tweetId existem
    if (!userId || !tweetId) {
      res.status(400).json({ error: "User ID or Tweet ID is missing." });
      return; // Retorna imediatamente após enviar a resposta
    }

    // Criar a resposta para o tweet
    const reply = await prisma.tweet.create({
      data: {
        content,
        userId, // userId como número
        type: "Reply",
        originalTweetId: tweetId, // Referência ao tweet original
      },
    });

    res.status(201).json(reply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reply to tweet." });
  }
};
