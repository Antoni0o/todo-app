import { Response } from "express";
import { AuthRequest } from "../../@types/express";
import { UpdateAvatarService } from "../../services/user/UpdateAvatarService";

class UpdateAvatarController {
  async handle(req: AuthRequest, res: Response) {
    const { id } = req.user;
    const avatarName = req.file.filename;
    const avatar_url = `${process.env.API_URL}/avatars/${avatarName}`;

    const service = new UpdateAvatarService();
    const result = await service.execute({ id: String(id), avatar_url });

    return res.status(200).json({
      statusCode: 200,
      message: "Avatar Updated Successfully!",
      result,
    });
  }
}

export { UpdateAvatarController };
