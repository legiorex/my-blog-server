import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

dotenv.config()
const port = process.env.PORT

const app: Express = express()
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
    response.send('Hello world!!!!!!!!!!!!!!')
})

app.post('/auth/login', (request: Request, response: Response) => {
    const token = jwt.sign({ email: request.body.email }, `${process.env.SECRET}`)

    response.json({
        success: true,
        token,
    })
})

app.listen(port, () => console.log(`⚡️ Running on port ${port} ⚡️`)).on('error', (error) => {
    console.log('☢️💥 error 💥☢️', error)
})
