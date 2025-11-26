import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../../models/User";
import "dotenv/config";

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const users = [
      { name: "user 1", email: "user1@user1.com", password: "123456" },
      { name: "user 2", email: "user2@user2.com", password: "123456" },
    ];

    for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.password, 10);

      await User.create({
        name: u.name,
        email: u.email,
        password: hashedPassword,
      });
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

run();
