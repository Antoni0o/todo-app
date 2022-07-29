import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

class GetUserTodosService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    });

    if(!user) {
      throw new AppError("The user does not exists", 400);
    }

    const todo = await prismaClient.todo.findMany({
      where: {
        user_id
      },
    }); 

    return { 
      user_todos: todo
    };
  }
}

export { GetUserTodosService }