import { Request, Response } from "express";
import prisma from "../../prisma/client";

// Função para seguir um usuário
export const followUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const followUserId = parseInt(req.body.userId, 10);
    const currentUserId = req.body.user?.id;

    // Verifica se o currentUserId existe e é um número
    if (!currentUserId || isNaN(currentUserId)) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }

    if (isNaN(followUserId)) {
      res.status(400).json({ message: "Invalid user ID." });
      return;
    }

    if (currentUserId === followUserId) {
      res.status(400).json({ message: "Cannot follow yourself." });
      return;
    }

    // Verificar se o relacionamento já existe
    const existingFollow = await prisma.follower.findFirst({
      where: { followerId: currentUserId, followedId: followUserId },
    });

    if (existingFollow) {
      res.status(400).json({ message: "You are already following this user." });
      return;
    }

    // Criar a relação de seguimento
    await prisma.follower.create({
      data: {
        followerId: currentUserId,
        followedId: followUserId,
      },
    });

    res.status(201).json({ message: "User followed successfully." });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Função para deixar de seguir um usuário
export const unfollowUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const unfollowUserId = parseInt(req.body.userId, 10);
    const currentUserId = req.body.user?.id;

    // Verifica se o currentUserId existe e é um número
    if (!currentUserId || isNaN(currentUserId)) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }

    if (isNaN(unfollowUserId)) {
      res.status(400).json({ message: "Invalid user ID." });
      return;
    }

    // Verificar se o usuário segue o outro
    const existingFollow = await prisma.follower.findFirst({
      where: { followerId: currentUserId, followedId: unfollowUserId },
    });

    if (!existingFollow) {
      res.status(404).json({ message: "You are not following this user." });
      return;
    }

    // Remover a relação de seguimento
    await prisma.follower.delete({
      where: { id: existingFollow.id },
    });

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Função para obter os seguidores de um usuário
export const getFollowers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID." });
      return;
    }

    const followers = await prisma.follower.findMany({
      where: { followedId: userId },
      include: { follower: true },
    });

    res.status(200).json(followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
