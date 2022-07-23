import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default (request: Request, response: Response, next: NextFunction) => {
    const token = (request.headers.authorization || '').replace(/Bearer\s?/, '')

    if (!token) {
        return response.status(403).json({
            message: 'Нет доступа',
        })
    }

    return jwt.verify(token, `${process.env.SECRET}`, (error, decoded) => {
        if (error) {
            return response.status(403).json({
                message: 'Нет доступа',
            })
        }
        request.userId = (decoded as JwtPayload)._id

        return next()
    })
}
