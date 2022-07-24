import mongoose from 'mongoose'

const { Schema, model } = mongoose

export type PostType = {
    title: string
    text: string
    tags?: string[]
    imageUrl?: string
    viewsCount: number
    user: mongoose.Schema.Types.ObjectId
}

const PostSchema = new Schema<PostType>(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        imageUrl: String,
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
)

export default model('Post', PostSchema)
