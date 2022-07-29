import { hash } from 'bcrypt';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

import prismaClient from '../../prisma';

dayjs.extend(utc);

interface IUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

class UpdateUserService {
  async execute({ id, name, email, password }: IUserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    });

    const passwordHash = await hash(password, 8);

    let dateNow = dayjs().utc(true).format();

    const updatedUser = await prismaClient.user.update({
      where: {
        id
      },
      data: {
        name: name === "" ? user.name : name,
        email: email === "" ? user.email : email,
        password: password === "" ? user.password : passwordHash,
        updated_at: dateNow
      }
    });

    return {
      updated_user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar_url: updatedUser.avatar_url,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at
      }
    };
  }
}

export { UpdateUserService }