import { Router } from "express";
import { limiter } from '../../middleware/limiter.js'
import { authorization } from '../../middleware/authorize.js'
import { uploadDocuments } from '../../middleware/multer.js'
import { ServicesController } from "./services.controller.js";
import { verifyToken } from "../../middleware/auth.js";

const servicesRouter = Router()

servicesRouter.get('/', verifyToken, ServicesController.getApplications)

servicesRouter.get('/:id', verifyToken, ServicesController.getApplicationsById)

servicesRouter.get('/:id/document', verifyToken, ServicesController.getDocument)

servicesRouter.patch('/:id/', verifyToken, authorization('ADMIN'), ServicesController.updateApplications)

servicesRouter.patch('/:id/status', verifyToken, authorization('ADMIN'), ServicesController.updateApplicationsStatus)

servicesRouter.patch('/:id/delete', verifyToken, authorization('ADMIN'), ServicesController.deleteApplications)

servicesRouter.post('/', verifyToken, uploadDocuments, ServicesController.createApplications)

export default servicesRouter