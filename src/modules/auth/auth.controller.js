import { AuthService } from "./auth.service.js";
export class AuthController{
    static async register(req, res){
        try {
            const result = await AuthService.register(req.validated)
            return res.status(201).json(result)
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ message: error.message })
        }
    }
}