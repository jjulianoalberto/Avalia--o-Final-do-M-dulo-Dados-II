import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";
import { hashPassword, verifyPassword } from "../utils/hashPassword";

const secret = process.env.JWT_SECRET || "secret";

// Registro de usuário
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res
        .status(400)
        .json({ message: "Username, email, and password are required." });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "Username or email already in use." });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered successfully.", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Login de usuário
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await verifyPassword(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
