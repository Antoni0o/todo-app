import { Response, NextFunction } from 'express';
import { AuthRequest } from '../@types/express';
import { VerifyAllDeadlinesService } from '../services/todo/VerifyAllDeadlinesService';

async function verifyDeadlinesMiddleware(request: AuthRequest, response: Response, next: NextFunction) {
    const { id } = request.user;

    const service = new VerifyAllDeadlinesService();
    await service.execute(id);
    
    next();
};

export { verifyDeadlinesMiddleware };