import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

dayjs.extend(utc);

interface ITodoRequest {
  id: string;
  name?: string;
  description?: string;
  deadline?: string;
}

class UpdateTodoService {
  async execute({ id, name, description, deadline }: ITodoRequest) {
    const todo = await prismaClient.todo.findFirst({
      where: {
        id
      }
    });

    if(!todo) {
      throw new AppError("Todo not found!", 400);
    }

    const dateNow = dayjs().utc(true).format();
    const dateDeadline = dayjs(deadline).utc(true).format();

    const updatedTodo = await prismaClient.todo.update({
      where: {
        id
      },
      data: {
        name: name === "" ? todo.name : name,
        description: description === "" ? todo.description : description,
        deadline: deadline === "" ? todo.deadline : dateDeadline, 
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

export { UpdateTodoService }