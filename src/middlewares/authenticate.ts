import { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export function AuthenticateMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");
  const jwt = require("jsonwebtoken");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = { id: decoded.userId };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
