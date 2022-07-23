import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', (request: Request, response: Response) => {
    response.send('Hello world!!!!!!!!!!!!!!')
})

app.post('/auth/login', (request: Request, response: Response) => {
    console.log('!')

    response.json({
        success: true,
    })
})

app.listen(port, () => console.log(`⚡️ Running on port ${port} ⚡️`)).on('error', (error) => {
    console.log('☢️💥 error 💥☢️', error)
})
