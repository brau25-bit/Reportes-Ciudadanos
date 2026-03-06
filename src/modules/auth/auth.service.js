import prisma from '../../db/prisma.js'
import hashService from '../../utils/hash.js'
import jwtService from '../../utils/jwt.js'
import { emailService, notificationService, passwordService } from '../../utils/emailService.js'
import crypto from 'crypto'

export class AuthService{
    static async register(data){
        try {
            const exists = await prisma.user.findUnique({
                where: { email: data.email }
            })

            if(exists) throw new Error("Credenciales incorrectas")

            const password = await hashService.hash(data.password)
            const verificationToken = crypto.randomBytes(32).toString('hex')

            const newuser = {
                ...data,
                password,
                verificationToken
            }

            const result = await prisma.user.create({data: newuser})

            if(!result) throw new Error("Fallo al registrar usuario");
            
            await emailService(newuser.email, verificationToken)            

            return { message: "Usuario registrado correctamente" }
        } catch (error) {
            console.error("Error in register service:", error);
            throw error;
        }
    }

    static async login({email, password}){
        try {
            const user = await prisma.user.findUnique({where: {email: email}})

            if(!user) throw new Error("Credenciales incorrectas: email")

            if(!user.verified) throw new Error("Debes de verificar la cuenta antes de iniciar sesion. Revisa tu email.")

            const result = await hashService.compare(password, user.password)

            if(!result) throw new Error("Credenciales incorrectas: password")

            const token = jwtService.sign({
                id: user.id,
                role: user.role,
                canReport: user.canReport
            })

            return{
                token,
                user: {
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname
                }
            }
        } catch (error) {
            throw error
        }
    }

    static async verifyAccount({token}){
        try {
            const user = await prisma.user.findUnique(
                {where: {verificationToken: token}
            })

            if(!user) throw new Error("Credenciales invalidas")
            const verifiedAccount = await prisma.user.update({
                where: {id: user.id},
                data: {
                    verified: true,
                    verificationToken: null,
                    verifiedAt: new Date(),
                    canReport: true
                }
            })

            return {message: "Cuenta verificada exitosamente. Ya puedes iniciar sesión"}
        } catch (error) {
            console.error("Error in register service:", error);
            throw error; 
        }
    }
}