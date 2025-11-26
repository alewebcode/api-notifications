import { NextFunction, Request, Response } from "express";
import { AuthenticateService } from "../services/authenticate";

const authenticateService = new AuthenticateService();

export async function Authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await authenticateService.login(email, password);

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}
