import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};
