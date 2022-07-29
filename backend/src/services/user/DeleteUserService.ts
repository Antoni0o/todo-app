import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

class DeleteUserService {
  async execute(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });
    
    if(!user) {
      throw new AppError("Invalid Token!", 400);
    }
    
    await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}

export { DeleteUserService }