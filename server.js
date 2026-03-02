import app from './app.js'
import 'dotenv/config'
import authRouter from './src/modules/auth/auth.router.js'

const port = process.env.PORT

app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
    console.log("http://localhost:" + port)
})