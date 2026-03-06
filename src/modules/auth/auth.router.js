import { Router } from "express"
import { AuthController } from "./auth.controller.js"
import { validateSchema } from "../../middleware/validateSchema.js"
import { userSchema, partialUserSchema } from "../../schemas/users.schema.js"

const authRouter = Router()

authRouter.post('/register', validateSchema(userSchema), AuthController.register)

authRouter.post('/login', validateSchema(partialUserSchema), AuthController.login)

authRouter.post('/verify-acc', AuthController.verifyAccount)

export default authRouter