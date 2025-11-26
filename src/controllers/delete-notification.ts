import { NextFunction, Request, Response } from "express";
import { NotificatonService } from "../services/notification";

export async function DeleteNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const notificationService = new NotificatonService();

  const { id } = req.params;

  try {
    const notifications = await notificationService.delete(id);

    return res.status(201).json(notifications);
  } catch (error) {
    next(error);
  }
}
