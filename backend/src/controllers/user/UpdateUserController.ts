import { Response } from "express";
import { AuthRequest } from "../../@types/express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

interface IRequest {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}

class UpdateUserController {
  async handle(req: AuthRequest, res: Response) {
    const { id } = req.user;
    const { name, email, password, oldPassword }: IRequest = req.body;

    const service = new UpdateUserService();
    const result = await service.execute({
      id: String(id),
      name,
      email,
      password,
      oldPassword,
    });

    return res.status(200).json({
      statusCode: 200,
      message: "User Updated Successfully!",
      result,
    });
  }
}

export { UpdateUserController };
