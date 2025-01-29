// src/auth/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
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
    const decoded = jwt.verify(token, secret) as {
      id: number;
      username: string;
    }; // Define o tipo do decoded como { id: number }
    req.body.user = { username: decoded.username, id: decoded.id }; // Agora req.user tem um id garantido.
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
