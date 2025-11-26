import { NextFunction, Request, Response } from "express";
import { NotificatonService } from "../services/notification";

export async function UpdateReadNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const notificationService = new NotificatonService();

  const { id } = req.params;

  try {
    const notifications = await notificationService.markRead(id);

    return res.status(201).json(notifications);
  } catch (error) {
    next(error);
  }
}
