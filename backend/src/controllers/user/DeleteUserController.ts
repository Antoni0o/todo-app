import { Response } from "express";
import { AuthRequest } from "../../@types/express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
  async handle(req: AuthRequest, res: Response) {
    const { id } = req.user;
    
    const service = new DeleteUserService();
    const result = await service.execute(String(id));

    return res.status(204).json({});
  }
}

export { DeleteUserController };