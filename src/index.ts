import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

dotenv.config()
const port = process.env.PORT

mongoose
    .connect(`mongodb+srv://admin:${process.env.DB_PASS}@cluster0.2kaywu0.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('DB Ok'))
    .catch((error) => console.log('DB error', error))

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
