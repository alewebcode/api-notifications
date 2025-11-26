import { NextFunction, Response } from "express";
import { NotificatonService } from "../services/notification";
import { AuthRequest } from "../middlewares/authenticate";

export async function UnreadCountNotification(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const notificationService = new NotificatonService();

  const userId = req.user!.id;

  try {
    const unreadCountNotifications = await notificationService.getUnreadCount(
      userId
    );

    return res.status(201).json(unreadCountNotifications);
  } catch (error) {
    next(error);
  }
}
