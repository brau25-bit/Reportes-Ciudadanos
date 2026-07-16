import { Router } from "express";
import { ReportController } from "./report.contoller.js";
import { verifyToken } from "../../middleware/auth.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import {reportSchema, partialReportSchema} from '../../schemas/report.schema.js'
import {authorization} from '../../middleware/authorize.js'
import { limiter } from "../../middleware/limiter.js";

const reportRouter = Router()

reportRouter.get('/', limiter, verifyToken, ReportController.getReports)
reportRouter.get('/:id', limiter, verifyToken, ReportController.getReportsByID)
reportRouter.get('/:id/history', limiter, verifyToken, authorization('ADMIN', 'USER'), ReportController.getReportsHistory)

reportRouter.patch('/:id', limiter, verifyToken, authorization('USER'), validateSchema(partialReportSchema), ReportController.updateReports)

reportRouter.patch('/:id/delete', limiter, verifyToken, authorization('USER', 'ADMIN'), ReportController.deleteReports)

reportRouter.patch('/:id/status', limiter, verifyToken, authorization('ADMIN'), validateSchema(partialReportSchema), ReportController.updateReportStatus)

reportRouter.post('/', limiter, verifyToken, authorization('USER'), validateSchema(reportSchema), ReportController.createReports)

export default reportRouter