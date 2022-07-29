import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

dayjs.extend(utc);

interface ITodoRequest {
  id: string;
}

class MarkTodoAsDoneService {
  async execute(id: string) {
    const todo = await prismaClient.todo.findFirst({
      where: {
        id
      }
    });

    if(!todo) {
      throw new AppError("Todo not found!", 404);
    }

    const dateNow = dayjs().utc(true).format();

    const updatedTodo = await prismaClient.todo.update({
      where: {
        id
      },
      data: {
        done: true,
        updated_at: dateNow
      }
    });

    return {
      updated_todo: {
        updatedTodo
      } 
    };
  }
}

export { MarkTodoAsDoneService }