import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import UserModel, { UserType } from './models/User'
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

app.post('/auth/sign-in', async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body
        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: 'Пользователь не найден',
            })
        }

        const currentUser = user.toObject()

        const isValidPass = await bcrypt.compare(password, currentUser.passwordHash)

        if (!isValidPass) {
            return response.status(400).json({
                message: 'Не верный логин или пароль',
            })
        }
        const token = jwt.sign({ _id: user._id }, `${process.env.SECRET}`, {
            expiresIn: '30d',
        })

        delete (currentUser as Partial<UserType>).passwordHash

        return response.json({ ...currentUser, token })
    } catch (error) {
        console.log('~ ~ file: index.ts ~ line 62 ~ app.post ~ error', error)

        return response.status(500).json({
            message: 'Не удалось авторизоваться',
        })
    }
})

app.post('/auth/sign-up', registerValidator, async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json(errors.array())
        }

        const { email, fullName, avatarUrl, password } = request.body

        const salt = await bcrypt.genSalt(10)

        const passwordHash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email,
            fullName,
            avatarUrl,
            passwordHash,
        })

        const user = await doc.save()

        const token = jwt.sign({ _id: user._id }, `${process.env.SECRET}`, {
            expiresIn: '30d',
        })

        const responseUser: Partial<UserType> = user.toObject()

        delete responseUser.passwordHash

        return response.json({ ...responseUser, token })
    } catch (error) {
        console.log('~ ~ file: index.ts ~ line 62 ~ app.post ~ error', error)

        return response.status(500).json({
            message: 'Не удалось зарегистрироваться',
        })
    }
})

app.listen(port, () => console.log(`⚡️ Running on port ${port} ⚡️`)).on('error', (error) => {
    console.log('☢️💥 error 💥☢️', error)
})
