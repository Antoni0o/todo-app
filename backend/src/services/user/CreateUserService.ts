import { hash } from 'bcrypt';

import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  async execute({ name, email, password }: IUserRequest) {
    let user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if(user) {
      throw new AppError("A user already exists with this email!", 400);
    }

    const passwordHash = await hash(password, 8)

    user = await prismaClient.user.create({
      data: {
        name, 
        email, 
        password: passwordHash,
        avatar_url: `${process.env.API_URL}/avatars/default-avatar.jpg` 
      }
    });


    return { 
      created_user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        created_at: user.created_at
      }
    };
  }
}

export { CreateUserService }