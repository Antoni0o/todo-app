import { Response } from 'express';

import { AuthRequest } from '../../@types/express';
import { GetUserTodosService } from '../../services/todo/GetUserTodosService';

class GetUserTodosController {
  async handle(req: AuthRequest, res: Response) {
    const { id } = req.user;

    const service = new GetUserTodosService();
    const result = await service.execute(id);

    return res.status(200).json({
      statusCode: 200,
      message: "Todo's Found Successfully!",
      result
    });
  }
}

export { GetUserTodosController };