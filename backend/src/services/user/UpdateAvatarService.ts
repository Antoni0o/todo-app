import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma";

dayjs.extend(utc);

interface IUserRequest {
  id: string;
  avatar_url: string;
}

class UpdateAvatarService {
  async execute({ id, avatar_url }: IUserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Invalid Token!", 400);
    }

    const dateNow = dayjs().utc(true).format();

    const updatedUser = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        avatar_url,
        updated_at: dateNow,
      },
    });

    console.log(updatedUser);

    return {
      updated_user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar_url: updatedUser.avatar_url,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
      },
    };
  }
}

export { UpdateAvatarService };
