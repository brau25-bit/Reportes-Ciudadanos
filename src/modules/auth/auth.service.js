import prisma from '../../db/prisma.js'
import hashService from '../../utils/hash.js'
import { emailService } from '../../utils/emailService.js'
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
}