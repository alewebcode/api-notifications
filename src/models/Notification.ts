import { model, Schema } from "mongoose";
import { INotification } from "../types/Notification";

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const Notification = model<INotification>(
  "Notification",
  NotificationSchema
);
