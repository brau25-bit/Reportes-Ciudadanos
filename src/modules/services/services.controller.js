import { ServicesService } from "./services.service.js";
export class ServicesController {
    static async getApplications(req, res){
        try {
            const role = req.user.role
            const userId = req.user.id
            const page = req.query.page || 1
            const limit = req.query.limit || 10

            const result = await ServicesService.getApplications(userId, role, page, limit)

            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({"message": error.message})
        }
    }

    static async getApplicationsById(req, res){
        try {
            const role = req.user.role
            const appId = req.params.id
            const userId = req.user.id

            const result = await ServicesService.getApplicationsById(role, userId, appId)

            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({"message": error.message})
        }
    }

    static async getDocument(req, res){
        try {   
            const id = req.params

            const result = await ServicesService.getDocument(id)

            res.sendFile(result)
        } catch (error) {
            return res.status(400).json({"message": "no document found"})
        }
    }

    static async updateApplications(req, res){
        try {
            const id = req.params
            const status = req.body.status

            const result = await ServicesService.updateApplicationsStatus(id, status)

            res.status(200).json(result)            
        } catch (error) {
            return res.status(400).json({"message": error.message})
        }
    }

    static async updateApplicationsStatus(req, res){
        try {
            const id = req.params
            const status = req.body.status

            const result = await ServicesService.updateApplicationsStatus(id, status)

            res.status(200).json(result)            
        } catch (error) {
            return res.status(400).json({"message": error.message})
        }
    }

    static async deleteApplications(req, res){
        try {
            const appId = req.params.id
            const userId = req.user.id

            const result = await ServicesService.deleteApplications(userId,appId)

            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({"message": error.message})
        }
    }

    static async createApplications(req, res){
        try {
            const data = req.body
            const files = req.files ?? []
            const userId = req.user.id

            console.log("ingresa al controller")

            const result = await ServicesService.createApplications(userId, data, files)

            return res.status(201).json(result)
        } catch (error) {
            return res.status(400).json({"message": error.message})
        }
    }
}