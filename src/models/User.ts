import { Schema, model } from 'mongoose'

type User = {
    fullName: string
    email: string
    passwordHash: string
    avatarUrl?: string
}

const UserSchema = new Schema<User>(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    },
    {
        timestamps: true,
    },
)

export default model('User', UserSchema)
