import { Response } from 'express';
import { AuthRequest } from '../../@types/express';
import { GetUserService } from '../../services/user/GetUserService';

class GetUserController {
  async handle(req: AuthRequest, res: Response) {
    const { id } = req.user; 

    const service = new GetUserService();
    const result = await service.execute(id);

    return res.status(201).json({
      statusCode: 201,
      message: "User Found Successfully!",
      result
    });
  }
}

export { GetUserController };