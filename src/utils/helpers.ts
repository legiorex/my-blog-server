import jwt from 'jsonwebtoken'

export const getToken = (id: string) =>
    jwt.sign({ _id: id }, `${process.env.SECRET}`, {
        expiresIn: '30d',
    })
