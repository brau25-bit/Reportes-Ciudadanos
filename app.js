import express from 'express'

const app = express()

app.use(express.json())
app.disable("x-powered-by")

export default app