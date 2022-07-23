import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'

import * as UserController from './controllers/UserController'
import checkAuth from './utils/checkAuth'
import { registerValidator } from './validations/auth'

dotenv.config()
const port = process.env.PORT

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.2kaywu0.mongodb.net/blog-db?retryWrites=true&w=majority`,
    )
    .then(() => console.log('DB Ok'))
    .catch((error) => console.log('DB error', error))

const app: Express = express()
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
    response.send('Hello world!!!!!!!!!!!!!!')
})

app.post('/auth/sign-in', UserController.singIn)

app.post('/auth/sign-up', registerValidator, UserController.signUp)

app.get('/auth/user', checkAuth, UserController.getUser)

app.listen(port, () => console.log(`⚡️ Running on port ${port} ⚡️`)).on('error', (error) => {
    console.log('☢️💥 error 💥☢️', error)
})
