import dayjs from 'dayjs';

import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

interface IUserRequest {
  user_id: string;
  name: string;
  description: string;
  deadline: string;
};

class CreateTodoService {
  async execute({ user_id, name, deadline, description }: IUserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    });

    if(!user) {
      throw new AppError("The todo creator does not exists", 400);
    }

    const dateDeadline = dayjs(deadline).utc(true).format();

    const todo = await prismaClient.todo.create({
      data: {
        name,
        description,
        deadline: dateDeadline,
        user_id,
      },
      include: {
        user: false
      }
    }); 

    return { 
      created_todo: todo
    };
  }
}

export { CreateTodoService }