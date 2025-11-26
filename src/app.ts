import "dotenv/config";
import express from "express";
import { connectDB } from "./database/mongo";
import authRoutes from "./routes/authenticate";
import notificationRoutes from "./routes/notification";
import { AuthenticateMiddleware } from "./middlewares/authenticate";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

app.use(express.json());
app.use(authRoutes);

app.use(AuthenticateMiddleware);
app.use(notificationRoutes);
app.use(errorHandler);
export default app;
