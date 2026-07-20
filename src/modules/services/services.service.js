import { skip } from '@prisma/client/runtime/library';
import prisma from '../../db/prisma.js'
import { createFolio } from '../../utils/folioMaker.js'
import { application } from 'express';

export class ServicesService {
    static async getApplications(userId, role, page, limit){
        try {
            let filter = {}

            if(role === "USER") filter.userId = userId

            const total = await prisma.application.count({
                where: filter
            })

            const applications = await prisma.application.findMany({
                where: filter,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {"createdAt": "asc"},
                include: {
                    data: true,
                    documents: true,
                    history: true
                }
            });

            if(applications.length == 0) throw new Error("sin resultados")

            return {
                data: applications,
                pagination: {
                    page: page,
                    limit: limit,
                    total: total,
                    totalPages: Math.ceil(total / limit)
                }
            }
        } catch (error) {
            throw error
        }
    }

    static async getApplicationsById(role, userId, appId){
        try {
            let filter = {}

            console.log(appId)

            filter.id = appId

            const app = await prisma.application.findUnique({
                where: filter,
                include: {
                    data: true,
                    documents: true,
                    history: true
                }
            })

            if (!app) throw new Error("Service not found")
 
            return app
        } catch (error) {
            throw error
        }
    }

    static async getDocument(id){
        try {
            const document = await prisma.document.findUnique({
                where: id
            })

            if(!document) throw new Error("Not found")

            return document.filePath 
        } catch (error) {
            throw error
        }
    }

    static async updateApplicationsStatus(id, status){
        try {
            const app = await prisma.application.findUnique({
                where: id,
            })

            if(!app) throw new Error("No application with that ids")

            const result = await prisma.$transaction(async (tx) => {
                const appStatus = await tx.application.update({
                    where: {id: app.id},
                    data: {
                        status: status
                    }
                })

                const history = await tx.applicationHistory.create({
                    data: {
                        previousStatus: app.status,
                        newStatus: appStatus.status,
                        action: "Modificacion de estado",
                        application: {
                            connect: {
                                id: app.id
                            }
                        }
                    }
                })
            })

            return result
        } catch (error) {
            throw error
        }
    }

    static async deleteApplications(userId, appId){
        try {
            const app = await prisma.application.findUnique({
                where: {id: appId}
            })

            const status = "CANCELLED"

            if(app.status === "DELETED") throw new Error("Service is already deleted")

            const result = await prisma.$transaction(async (tx) => {
                const appStatus = await tx.application.update({
                    where: {id: appId},
                    data: {
                        status: status
                    }
                })

                const history = await tx.applicationHistory.create({
                    data: {
                        previousStatus: app.status,
                        newStatus: appStatus.status,
                        action: "Tramite eliminado",
                        application: {
                            connect: {
                                id: appId
                            }
                        }
                    }
                })

                return appStatus
            })
        
            return result
        } catch (error) {
            throw error
        }
    }

    static async createApplications(userId, jsonData, files = []){
        try {
            const { documentTypes = [], personType, applicationType, data } = jsonData

            const count = await prisma.application.count({
                where: {applicationType}
            }) 

            const folio = await createFolio(applicationType, count === 0 ? 1: count + 1)

            const parsedData = typeof data === "string" ? JSON.parse(data) : data;

             const parsedDocumentTypes = typeof documentTypes === "string" ? JSON.parse(documentTypes) : documentTypes;

             const application = await prisma.$transaction(async (tx) => {
                
                const app = await tx.application.create({
                    data: {
                        folio: folio,
                        applicationType: applicationType,
                        personType: personType,
                        userId: userId
                    }
                })

                const appData = await tx.applicationData.create({
                    data: {
                        applicationId: app.id,
                        data: parsedData
                    }
                })

                 if (files.length > 0) {
                    const documentRecords = files.map((file, index) => ({
                        applicationId: app.id,
                        documentType: parsedDocumentTypes[index] ?? "OTHER",
                        fileName: file.originalname,
                        filePath: file.path,
                        mimeType: file.mimetype,
                        fileSize: file.size,
                    }));
                    
                    await tx.document.createMany({ data: documentRecords });
                }

                await tx.applicationHistory.create({
                    data: {
                        applicationId: app.id,
                        previousStatus: null,
                        newStatus: "DRAFT",
                        action: "Trámite creado",
                    },
                });

                return tx.application.findUnique({
                    where: { id: app.id },
                    include: {
                        data: true,
                        documents: true,
                        history: true
                    }
                });
            })

            return application
        } catch (error) {
            throw error
        }
    }
}