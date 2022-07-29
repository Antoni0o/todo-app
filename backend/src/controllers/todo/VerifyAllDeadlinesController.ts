import { Response } from 'express';

import { AuthRequest } from '../../@types/express';
import { GetUserTodosService } from '../../services/todo/GetUserTodosService';
import { VerifyDeadlineService } from '../../services/todo/VerifyDeadlineService';
import { AppError } from '../../errors/AppError';
import { VerifyAllDeadlinesService } from '../../services/todo/VerifyAllDeadlinesService';

class VerifyAllDeadlinesController {
  async handle(req: AuthRequest, res: Response) {
    const { id } = req.user;

    const service = new VerifyAllDeadlinesService();
    await service.execute(id);
    
    return res.status(200).json({
      statusCode: 200,
      message: 'Todos Verified Successfully',
    })
  }
}

export { VerifyAllDeadlinesController };