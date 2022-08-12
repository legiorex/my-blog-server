import cors from 'cors'
import 'dotenv/config'
import express, { Express } from 'express'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'

import routes from './routes/routes.js'

const port = process.env.PORT

mongoose
    .connect(`${process.env.DB_URL}`)
    .then(() => console.log('DB Ok'))
    .catch((error) => console.log('DB error', error))

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())

app.use('/', routes)

app.listen(port, () => console.log(`⚡️ Running on port ${port} ⚡️`)).on('error', (error) => {
    console.log('☢️💥 error 💥☢️', error)
})

export default app
