import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const service = new AuthenticateUserService();
    const { user, token } = await service.execute({
      email,
      password
    });

    return res.status(200).json({
      statusCode: 200,
      message: "User Authenticated Successfully!",   
      authentication: {
        user,
        token
      } 
    });
  }
}

export { AuthenticateUserController };