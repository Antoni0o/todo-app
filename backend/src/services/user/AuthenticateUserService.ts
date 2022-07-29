import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import auth from '../../config/auth';
import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma";

interface IUserRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IUserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if(!user) {
      throw new AppError("Email or password incorrect!", 400);
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError("Email or password incorrect!", 400);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({ user }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    }
  };
};

export { AuthenticateUserService };