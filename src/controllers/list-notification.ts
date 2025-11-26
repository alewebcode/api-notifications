import { NextFunction, Response } from "express";
import { NotificatonService } from "../services/notification";
import { AuthRequest } from "../middlewares/authenticate";

export async function ListNotification(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const notificationService = new NotificatonService();

  const userId = req.user!.id;

  try {
    const notifications = await notificationService.listByUser(userId, {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    });

    return res.status(201).json(notifications);
  } catch (error) {
    next(error);
  }
}
