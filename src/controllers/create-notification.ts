import { NextFunction, Request, Response } from "express";
import { NotificatonService } from "../services/notification";
import { CreateNotificationSchema } from "../schemas/notification";
import { AuthRequest } from "../middlewares/authenticate";

export async function CreateNotification(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const notificationService = new NotificatonService();

  const parse = CreateNotificationSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({ error: parse.error.issues });
  }

  const { title, message } = parse.data;
  const userId = req.user!.id;

  try {
    const notification = await notificationService.create(
      userId,
      title,
      message
    );

    return res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
}
