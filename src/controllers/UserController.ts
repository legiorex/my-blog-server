import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import UserModel, { UserType } from '../models/User.js'
import { getToken } from '../utils/index.js'

export const getUser = async (request: Request, response: Response) => {
    try {
        const user = await UserModel.findById(request.userId)

        if (!user) {
            return response.status(400).json({
                message: 'Пользователь не найден',
            })
        }

        const responseUser: Partial<UserType> = user.toObject()

        delete responseUser.passwordHash

        return response.json({
            ...responseUser,
            token: getToken(user.id),
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Нет доступа',
        })
    }
}

export const signUp = async (request: Request, response: Response) => {
    try {
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

        const responseUser: Partial<UserType> = user.toObject()

        delete responseUser.passwordHash

        return response.json({ ...responseUser, token: getToken(user.id) })
    } catch (error) {
        return response.status(500).json({
            message: 'Не удалось зарегистрироваться',
        })
    }
}

export const singIn = async (request: Request, response: Response) => {
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

        delete (currentUser as Partial<UserType>).passwordHash

        return response.json({ ...currentUser, token: getToken(user.id) })
    } catch (error) {
        return response.status(500).json({
            message: 'Не удалось авторизоваться',
        })
    }
}
