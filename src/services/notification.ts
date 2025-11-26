import { Types } from "mongoose";
import { Notification } from "../models/Notification";
import { AppError } from "../errors/App.error";
import { redis } from "../database/redis";

export class NotificatonService {
  async create(userId: string, title: string, message: string) {
    const notification = await Notification.create({
      userId: new Types.ObjectId(userId),
      title,
      message,
    });

    await redis.incr(`notifications:unreadCount:${userId}`);

    return notification;
  }

  async listByUser(
    userId: string,
    opts: { page?: number; limit?: number } = {}
  ) {
    const page = opts.page ?? 1;
    const limit = opts.limit ?? 10;

    const query: any = { userId: new Types.ObjectId(userId), deletedAt: null };

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Notification.countDocuments(query),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        pages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async markRead(id: string) {
    const notification = await Notification.findById(id);

    if (!notification) {
      throw new AppError("Notificação não encontrada", 404);
    }

    notification.isRead = true;

    await redis.decr(`notifications:unreadCount:${notification.userId}`);

    return notification.save();
  }

  async delete(id: string) {
    const notification = await Notification.findById(id);

    if (!notification) {
      throw new AppError("Notificação não encontrada", 404);
    }

    if (!notification.isRead) {
      await redis.decr(`notifications:unreadCount:${notification.userId}`);
    }

    notification.deletedAt = new Date();

    return notification.save();
  }

  async getUnreadCount(userId: string) {
    const count = await redis.get(`notifications:unreadCount:${userId}`);

    return Number(count) || 0;
  }
}
