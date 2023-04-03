import { compare, hash } from "bcrypt";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppError } from "../../errors/AppError";

import prismaClient from "../../prisma";

dayjs.extend(utc);

interface IUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}

interface IUpdateUserWithPasswordRequest {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  userEmail?: string;
  password: string;
  oldPassword: string;
  userPassword: string;
}

interface IUpdateUserWithoutPasswordRequest {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  userEmail?: string;
}

class UpdateUserService {
  async execute({ id, name, email, password, oldPassword }: IUserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    let updatedUser;

    if (oldPassword && password) {
      updatedUser = await this.updateUserWithPassword({
        id,
        name,
        email,
        userEmail: user.email,
        username: user.name,
        userPassword: user.password,
        password: password,
        oldPassword: password,
      });
    }

    updatedUser = await this.updateUserWithoutPassword({
      id,
      name,
      email,
      userEmail: user.email,
      username: user.name,
    });

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

  async updateUserWithPassword({
    name,
    email,
    password,
    oldPassword,
    userPassword,
    username,
    userEmail,
    id,
  }: IUpdateUserWithPasswordRequest) {
    if (compare(userPassword, oldPassword)) {
      throw new AppError("The old password dont match!", 400);
    }

    const passwordHash = await hash(password, 8);

    let dateNow = dayjs().utc(true).format();

    return await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name: name === "" ? username : name,
        email: email === "" ? userEmail : email,
        password: password === "" ? userPassword : passwordHash,
        updated_at: dateNow,
      },
    });
  }

  async updateUserWithoutPassword({
    id,
    email,
    name,
    userEmail,
    username,
  }: IUpdateUserWithoutPasswordRequest) {
    let dateNow = dayjs().utc(true).format();

    return await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name: name === "" ? username : name,
        email: email === "" ? userEmail : email,
        updated_at: dateNow,
      },
    });
  }
}

export { UpdateUserService };
