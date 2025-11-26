import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { Notification } from "../src/models/Notification";
import jwt from "jsonwebtoken";
import { User } from "../src/models/User";

describe("Notification tests", () => {
  let notificationId: string;
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect("mongodb://localhost:27017/notifications_test");
  });
  beforeAll(async () => {
    await User.deleteMany({});
    await Notification.deleteMany({});

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });

    userId = user._id.toString();

    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "test_secret", {
      expiresIn: "1h",
    });

    const notification = await Notification.create({
      userId: new mongoose.Types.ObjectId(),
      title: "Teste",
      message: "Mensagem de teste",
      isRead: false,
    });

    notificationId = notification._id.toString();
  });

  afterAll(async () => {
    await Notification.deleteMany({});
    await mongoose.disconnect();
  });

  it("should create a new notification", async () => {
    const response = await request(app)
      .post("/notifications")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: new mongoose.Types.ObjectId(),
        title: "Nova notificação",
        message: "Mensagem aqui",
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Nova notificação");
    expect(response.body.isRead).toBe(false);
    expect(response.body.deletedAt).toBeNull();
  });

  it("should mark notification as read", async () => {
    const response = await request(app)
      .patch(`/notifications/${notificationId}/read`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(201);
    expect(response.body.isRead).toBe(true);
  });
});
