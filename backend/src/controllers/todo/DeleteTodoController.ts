import { Response } from "express";
import { AuthRequest } from "../../@types/express";
import { DeleteTodoService } from "../../services/todo/DeleteTodoService";

class DeleteTodoController {
  async handle(req: AuthRequest, res: Response) {
    const { id: user_id } = req.user;
    const { id: todo_id } = req.params;
    
    const service = new DeleteTodoService();
    const result = await service.execute({ todo_id, user_id: String(user_id)});

    return res.status(204).json({});
  }
}

export { DeleteTodoController };