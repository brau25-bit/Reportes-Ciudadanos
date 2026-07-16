import express from 'express'
import authRouter from './src/modules/auth/auth.router.js'
import reportRouter from './src/modules/reports/report.router.js'
import usersRouter from './src/modules/users/users.router.js'
import analyticsRouter from './src/modules/analytics/analytics.router.js'
import servicesRouter from './src/modules/services/services.router.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.disable("x-powered-by")
app.use(cors())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/reports', reportRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/analytics', analyticsRouter)
app.use('/api/v1/services', servicesRouter)

export default app