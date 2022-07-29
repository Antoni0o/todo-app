import { Router } from "express";
import multer from "multer";

import { storage } from '../config/upload'
import { AuthenticateUserController } from "../controllers/user/AuthenticateUserController";
import { UpdateAvatarController } from "../controllers/user/UpdateAvatarController";
import { CreateUserController } from "../controllers/user/CreateUserController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";
import { GetUserController } from "../controllers/user/GetUserController";

const userRoutes = Router();

const upload = multer({ storage });

userRoutes.post('/', new CreateUserController().handle);
userRoutes.post('/login', new AuthenticateUserController().handle);

userRoutes.get('/', new GetUserController().handle);

userRoutes.put('/update', ensureAuthentication, new UpdateUserController().handle);

userRoutes.patch('/avatar', ensureAuthentication, upload.single('img'), new UpdateAvatarController().handle);

userRoutes.delete('/delete', ensureAuthentication, new DeleteUserController().handle);

export { userRoutes }