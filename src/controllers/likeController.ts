import { Request, Response } from "express";
import prisma from "../../prisma/client";

// Função para curtir um tweet
export const likeTweet = async (req: Request, res: Response) => {
  const { tweetId } = req.body;
  const userId = req.body.user?.id;

  try {
    // Verificar se o like já existe, usando userId e tweetId combinados
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" }); // Verifica se o userId existe
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId, // Id do usuário
        tweetId: tweetId, // Id do tweet
      },
    });

    if (existingLike) {
      return res.status(400).json({ error: "You already liked this tweet." });
    }

    // Criar o like
    const like = await prisma.like.create({
      data: {
        userId: userId, // userId como número
        tweetId: tweetId, // tweetId já vindo como número
      },
    });

    res.status(201).json(like);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to like tweet." });
  }
};

// Função para desfazer o like de um tweet
export const unlikeTweet = async (req: Request, res: Response) => {
  const { tweetId } = req.params;
  const userId = req.body.user?.id;

  try {
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" }); // Verifica se o userId existe
    }

    // Verificar se o like existe
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId, // Id do usuário
        tweetId: Number(tweetId), // Conversão de tweetId para número
      },
    });

    // Se o like não existir, retornar erro
    if (!existingLike) {
      return res.status(404).json({ error: "You haven't liked this tweet." });
    }

    // Remover o like
    await prisma.like.delete({
      where: {
        id: existingLike.id, // Usar o id do like para excluí-lo
      },
    });

    res.status(200).json({ message: "Tweet unliked successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to unlike tweet." });
  }
};
