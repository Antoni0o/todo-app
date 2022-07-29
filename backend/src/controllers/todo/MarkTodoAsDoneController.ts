import { Response, Request } from 'express';

import { AuthRequest } from '../../@types/express';
import { MarkTodoAsDoneService } from '../../services/todo/MarkTodoAsDoneService';

class MarkTodoAsDoneController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new MarkTodoAsDoneService();
    const result = await service.execute(id);

    return res.status(200).json({
      statusCode: 200,
      message: "Todo Updated Successfully!",
      result
    });
  }
}

export { MarkTodoAsDoneController };