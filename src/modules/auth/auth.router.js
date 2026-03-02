import { Router } from "express"
import { AuthController } from "./auth.controller.js"
import { validateSchema } from "../../middleware/validateSchema.js"
import { userSchema } from "../../schemas/users.schema.js"

const authRouter = Router()

authRouter.post('/register', validateSchema(userSchema), AuthController.register)

export default authRouter