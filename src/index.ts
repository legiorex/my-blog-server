import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

import routes from './routes/routes.js'
import { checkAuth } from './utils/index.js'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const uploadsDir = path.join(__dirname, '/uploads/')

dotenv.config()
const port = process.env.PORT

mongoose
    .connect(`${process.env.DB_URL}`)
    .then(() => console.log('DB Ok'))
    .catch((error) => console.log('DB error', error))

const app: Express = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
            fs.mkdirSync(path.join(__dirname, 'uploads'))
        }

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

app.use('/', routes)

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

export default app
