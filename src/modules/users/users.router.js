import { Router } from "express";
import { partialUserSchema } from "../../schemas/users.schema.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { authorization } from "../../middleware/authorize.js";
import { verifyToken } from "../../middleware/auth.js";
import { limiterAdmin } from "../../middleware/limiter.js";
import { UserController } from "./users.controller.js";

const usersRouter = Router()

usersRouter.get('/', limiterAdmin, verifyToken, authorization('ADMIN'), UserController.getUsers)

usersRouter.get('/:id', limiterAdmin, verifyToken, authorization('ADMIN'), UserController.getUserById)

usersRouter.patch('/:id/ban',  limiterAdmin, verifyToken, authorization('ADMIN'), validateSchema(partialUserSchema), UserController.banUser)

usersRouter.patch('/:id/unban',  limiterAdmin, verifyToken, authorization('ADMIN'), UserController.unbanUser)

usersRouter.patch('/:id/toggle-report',  limiterAdmin, verifyToken, authorization('ADMIN'), UserController.toggleReportUser)

usersRouter.patch('/:id/role',  limiterAdmin, verifyToken, authorization('ADMIN'), validateSchema(partialUserSchema), UserController.changeUserRole)

export default usersRouter