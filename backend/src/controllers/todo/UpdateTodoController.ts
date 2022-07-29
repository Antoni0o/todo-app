import { Response } from 'express';

import { AuthRequest } from '../../@types/express';
import { UpdateTodoService } from '../../services/todo/UpdateTodoService';

class UpdateTodoController {
  async handle(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { name, description, deadline } = req.body; 

    const service = new UpdateTodoService();
    const result = await service.execute({ id, name, description, deadline });

    return res.status(200).json({
      statusCode: 200,
      message: "Todo Updated Successfully!",
      result
    });
  }
}

export { UpdateTodoController };