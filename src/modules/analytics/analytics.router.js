import { Router } from "express";
import { AnalyticsController } from "./analytics.controller.js";
import { limiterAdmin } from "../../middleware/limiter.js";
import { verifyToken } from "../../middleware/auth.js";
import { authorization } from "../../middleware/authorize.js";

const analyticsRouter = Router()

analyticsRouter.get('/report-by-status', limiterAdmin, verifyToken, authorization('ADMIN'), AnalyticsController.getReportsByStatus)

analyticsRouter.get('/report-by-category', limiterAdmin, verifyToken, authorization('ADMIN'), AnalyticsController.getReportsByCategory)

analyticsRouter.get('/report-over-time', limiterAdmin, verifyToken, authorization('ADMIN'), AnalyticsController.getReportsOverTime)

analyticsRouter.get('/report-heat-map', limiterAdmin, verifyToken, authorization('ADMIN'), AnalyticsController.getReportHeatMap)

analyticsRouter.get('/average-resolution-time', limiterAdmin, verifyToken, authorization('ADMIN'), AnalyticsController.getReportResolutionTime)

analyticsRouter.get('/time-per-status', limiterAdmin, verifyToken, authorization('ADMIN'), AnalyticsController.getTimeByStatus)

analyticsRouter.get('/status-transitions', limiterAdmin, verifyToken, authorization('ADMIN'), AnalyticsController.getStatusTransitions)

analyticsRouter.get('/generate-report-pdf', limiterAdmin, verifyToken, authorization('ADMIN'), AnalyticsController.generateFullReportPDF)

export default analyticsRouter