import { Router } from "express";
import { ReportController } from "./report.contoller.js";
import { verifyToken } from "../../middleware/auth.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import {reportSchema, partialReportSchema} from '../../schemas/users.schema.js'
import {authorization} from '../../middleware/authorize.js'
import { limiter } from "../../middleware/limiter.js";

const reportRouter = Router()

reportRouter.get('/', verifyToken, ReportController.getReports)
reportRouter.get('/:id', verifyToken, ReportController.getReportsByID)
reportRouter.get('/:id/history', verifyToken, authorization('ADMIN', 'USER'), ReportController.getReportsHistory)

reportRouter.patch('/:id', limiter, verifyToken, authorization('USER'), validateSchema(partialReportSchema), ReportController.updateReports)

reportRouter.patch('/:id/delete', verifyToken, authorization('USER', 'ADMIN'), ReportController.deleteReports)

reportRouter.patch('/:id/status', verifyToken, authorization('ADMIN'), validateSchema(partialReportSchema), ReportController.updateReportStatus)

reportRouter.post('/', limiter, verifyToken, authorization('USER'), validateSchema(reportSchema), ReportController.createReports)

export default reportRouter