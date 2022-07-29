import { Response } from 'express';

import { AuthRequest } from '../../@types/express';
import { VerifyDeadlineService } from '../../services/todo/VerifyDeadlineService';

class VerifyDeadlineController {
  async handle(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const service = new VerifyDeadlineService();
    const result = await service.execute(id);

    return res.status(201).json({
      statusCode: 201,
      message: "Todo Updated Successfully!",
      result
    });
  }
}

export { VerifyDeadlineController };