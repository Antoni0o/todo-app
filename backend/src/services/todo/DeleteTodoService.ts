import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

interface IRequest {
  user_id: string;
  todo_id: string;
}

class DeleteTodoService {
  async execute({ todo_id, user_id }: IRequest) {
    const todo = await prismaClient.todo.findFirst({
      where: {
        id: todo_id
      }
    });

    if(!todo) {
      throw new AppError("Todo Not Found!", 404);
    }

    if(todo.user_id !== user_id) {
      throw new AppError("The Todo is From Another User", 400);
    }

    await prismaClient.todo.delete({
      where: {
        id: todo_id
      },
    });
  }
}

export { DeleteTodoService }