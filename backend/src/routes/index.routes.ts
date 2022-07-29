import { Router } from "express";
import { todosRoutes } from "./todos.routes";

import { userRoutes } from "./user.routes";

const router = Router();

router.use('/user', userRoutes);
router.use('/todos', todosRoutes);

export { router };