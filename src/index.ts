import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'

import * as PostController from './controllers/PostController'
import * as UserController from './controllers/UserController'
import checkAuth from './utils/checkAuth'
import { signInValidator, signUpValidator } from './validations/auth'
import { postCreateValidation } from './validations/post'

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

// User routes
app.post('/auth/sign-in', signInValidator, UserController.singIn)
app.post('/auth/sign-up', signUpValidator, UserController.signUp)
app.get('/post', checkAuth, UserController.getUser)

// Posts routes
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

app.listen(port, () => console.log(`⚡️ Running on port ${port} ⚡️`)).on('error', (error) => {
    console.log('☢️💥 error 💥☢️', error)
})
