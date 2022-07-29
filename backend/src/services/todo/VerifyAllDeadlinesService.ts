import { AppError } from '../../errors/AppError';
import { GetUserTodosService } from './GetUserTodosService';
import { VerifyDeadlineService } from './VerifyDeadlineService';

class VerifyAllDeadlinesService {
  async execute(id: string) {
    const todoService = new GetUserTodosService();
    let todoServiceResult = await todoService.execute(id);
    let { user_todos: todos } = todoServiceResult;

    if(!todoServiceResult) {
      throw new AppError("Todos not found!", 404);
    };

    for(let i = 0; i < todos.length; i++) {
      const service = new VerifyDeadlineService();
      await service.execute(todos[i].id);
    }
  }
}

export { VerifyAllDeadlinesService }