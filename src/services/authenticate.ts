import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/App.error";

export class AuthenticateService {
  async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError("Usuário ou senha inválidos", 401);
    }
    const verifyUser = await bcrypt.compare(password, user.password);

    if (!verifyUser) {
      throw new AppError("Usuário ou senha inválidos", 401);
    }

    const payload = {
      userId: user._id,
      name: user.name,
    };

    const options = {
      expiresIn: 3600,
    };

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new AppError("JWT_SECRET não configurado!", 500);
    }

    const token = jwt.sign(payload, secret, options);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
