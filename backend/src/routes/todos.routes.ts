import { Router } from "express";

import { CreateTodoController } from "../controllers/todo/CreateTodoController";
import { DeleteTodoController } from "../controllers/todo/DeleteTodoController";
import { GetUserTodosController } from "../controllers/todo/GetUserTodosController";
import { MarkTodoAsDoneController } from "../controllers/todo/MarkTodoAsDoneController";
import { UpdateTodoController } from "../controllers/todo/UpdateTodoController";
import { VerifyAllDeadlinesController } from "../controllers/todo/VerifyAllDeadlinesController";
import { VerifyDeadlineController } from "../controllers/todo/VerifyDeadlineController";
import { ensureAuthentication }  from "../middlewares/ensureAuthenticationMiddleware";
import { verifyDeadlinesMiddleware } from "../middlewares/verifyDeadlinesMiddleware";

const todosRoutes = Router();

todosRoutes.use(ensureAuthentication)
todosRoutes.use(verifyDeadlinesMiddleware);

todosRoutes.post('/', new CreateTodoController().handle);

todosRoutes.get('/find', new GetUserTodosController().handle);

todosRoutes.put('/update/:id', new UpdateTodoController().handle);

todosRoutes.patch('/done/:id', new MarkTodoAsDoneController().handle);
todosRoutes.patch('/out-of-time/:id', new VerifyDeadlineController().handle);
todosRoutes.patch('/verify-all-deadlines', new VerifyAllDeadlinesController().handle);

todosRoutes.delete('/delete/:id', new DeleteTodoController().handle);

export { todosRoutes };