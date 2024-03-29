import dayjs from 'dayjs';
import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

class VerifyDeadlineService {
  async execute(id: string) {
    const todo = await prismaClient.todo.findFirst({
      where: {
        id
      }
    })

    if(!todo) {
      throw new AppError("Todo not found!", 404);
    }

    const deadline = dayjs(todo.deadline).utc(true).format();
    const dateNow = dayjs().utc(true).format();

    if(todo.out_of_time && dayjs(deadline).diff(dateNow, "hours") >= -24) {
      const updatedTodo = await prismaClient.todo.update({
        where: {
          id
        },
        data: {
          out_of_time: false,
          updated_at: dateNow
        } 
      });

      return updatedTodo
    }

    if(dayjs(deadline).diff(dateNow, "hours") <= -24) {
      const updatedTodo = await prismaClient.todo.update({
        where: {
          id
        },
        data: {
          out_of_time: true,
          updated_at: dateNow
        } 
      });

      return updatedTodo
    }

    return "deadline verified, all good";
  }
}

export { VerifyDeadlineService }