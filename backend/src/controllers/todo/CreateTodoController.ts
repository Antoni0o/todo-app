import { Response } from 'express';

import { AuthRequest } from '../../@types/express';
import { CreateTodoService } from '../../services/todo/CreateTodoService';

class CreateTodoController {
  async handle(req: AuthRequest, res: Response) {
    const {  name, description, deadline } = req.body; 
    const { id } = req.user;

    const service = new CreateTodoService();
    const result = await service.execute({ user_id: id, name, description, deadline });

    return res.status(201).json({
      statusCode: 201,
      message: "Todo Created Successfully!",
      result
    });
  }
}

export { CreateTodoController };