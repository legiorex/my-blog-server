import jwt from 'jsonwebtoken'

const getToken = (id: string) =>
    jwt.sign({ _id: id }, `${process.env.SECRET}`, {
        expiresIn: '30d',
    })

export { getToken }
