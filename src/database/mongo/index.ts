import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI || "";

export const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      return;
    }
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log("Erro ao conectar ao banco", error);
  }
};
