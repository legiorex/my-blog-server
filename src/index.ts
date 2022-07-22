import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port = process.env.PORT

dotenv.config()

app.get('/', (request: Request, response: Response) => {
    response.send('Hello world!')
})
app.listen(port, () => console.log(`⚡️ Running on port ${port}`))
