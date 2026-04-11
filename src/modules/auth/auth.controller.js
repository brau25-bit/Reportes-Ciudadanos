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

    static async login(req, res){
        try {
            const {password, email} = req.body

            const result = await AuthService.login({email, password})

            return res.status(200).json({
                user: result.user,
                token: result.token
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    static async verifyAccount(req, res){
        try {
            const {token} = req.query

            const result = await AuthService.verifyAccount({token})

            return res.status(200).json({
                ok: true,
                result
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    static async recoverPassword(req, res){
        try {
            const {email} = req.body

            const result = await AuthService.recoverPassword({email})

            res.status(200).json({
                ok: true,
                result
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    static async resetPassword(req, res){
        try {
            const {password} = req.body
            const {token} = req.query

            const result = await AuthService.resetPassword({token, password})

            res.status(200).json({
                ok: true,
                result
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ message: error.message })
        }
    }
}