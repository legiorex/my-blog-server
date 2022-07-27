import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

import { PostController, UserController } from './controllers'
import { checkAuth, handleValidationErrors } from './utils'
import { postCreateValidation, signInValidator, signUpValidator } from './validations'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const uploadsDir = path.join(__dirname, '/uploads/')

dotenv.config()
const port = process.env.PORT

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.2kaywu0.mongodb.net/blog-db?retryWrites=true&w=majority`,
    )
    .then(() => console.log('DB Ok'))
    .catch((error) => console.log('DB error', error))

const app: Express = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, uploadsDir)
    },
    filename: (_, file, cb) => {
        cb(null, `${new Date().toISOString()}-${file.originalname}`)
    },
})

const upload = multer({ storage })
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(uploadsDir))

app.get('/', (request: Request, response: Response) => {
    response.send('Hello world!!!!!!!!!!!!!!')
})

// User routes
app.post('/auth/sign-in', signInValidator, handleValidationErrors, UserController.singIn)
app.post('/auth/sign-up', signUpValidator, handleValidationErrors, UserController.signUp)
app.get('/user', checkAuth, UserController.getUser)

// Posts routes
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)
app.delete('/posts', checkAuth, PostController.remove)

// Uploads routes

app.post('/uploads', checkAuth, upload.single('image'), async (request: Request, response: Response) => {
    console.log('~ ~ file: index.ts ~ line 58 ~ app.post ~ request.file', request.file)

    return response.json({
        url: `/uploads/${request.file?.filename}`,
    })
})

app.listen(port, () => console.log(`⚡️ Running on port ${port} ⚡️`)).on('error', (error) => {
    console.log('☢️💥 error 💥☢️', error)
})
