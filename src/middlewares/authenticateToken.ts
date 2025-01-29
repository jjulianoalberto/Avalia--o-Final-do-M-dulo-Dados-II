import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

export const authenticateToken = (
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

  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded; // Anexa os dados do usuário na requisição
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token." });
  }
};
