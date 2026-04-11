import { Router } from "express"
import { AuthController } from "./auth.controller.js"
import { validateSchema } from "../../middleware/validateSchema.js"
import { userSchema, partialUserSchema } from "../../schemas/users.schema.js"
import {loginLimiter} from '../../middleware/limiter.js'

const authRouter = Router()

authRouter.post('/register', loginLimiter, validateSchema(userSchema), AuthController.register)

authRouter.post('/login', loginLimiter, validateSchema(partialUserSchema), AuthController.login)

authRouter.post('/verify-acc', loginLimiter, AuthController.verifyAccount)

authRouter.post('/recover-password', loginLimiter, validateSchema(partialUserSchema), AuthController.recoverPassword)

authRouter.post('/reset-password', loginLimiter, validateSchema(partialUserSchema), AuthController.resetPassword)

export default authRouter