import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

class GetUserService {
  async execute(id: string) {
    let user = await prismaClient.user.findFirst({
      where: {
        id
      },
      include: {
        todos: true
      }
    });
    
    if(!user) {
      throw new AppError("User not found!", 404);
    }
  
    return { 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
        todos: user.todos
      }
    };
  }
}

export { GetUserService }