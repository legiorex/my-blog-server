import { Request, Response } from 'express'

import PostModel from '../models/Post'

export const getAll = async (_: Request, response: Response) => {
    try {
        const posts = await PostModel.find()
            .populate({
                path: 'user',
                select: 'fullName email avatarUrl',
            })
            .exec()

        return response.json(posts)
    } catch (error) {
        console.log('~ ~ file: PostController.ts  ~ getAll ~ error', error)
        return response.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}
export const getOne = async (request: Request, response: Response) => {
    try {
        const post = await PostModel.findByIdAndUpdate(
            {
                _id: request.params.id,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
        )

        if (!post) {
            return response.status(404).json({
                message: 'Статья не найдена',
            })
        }

        return response.json(post)
    } catch (error) {
        console.log('~ ~ file: PostController.ts  ~ getOne ~ error', error)
        return response.status(500).json({
            message: 'Не удалось получить статью',
        })
    }
}

export const remove = async (request: Request, response: Response) => {
    try {
        const post = await PostModel.findByIdAndDelete(request.body.id)
            .populate({
                path: 'user',
                select: 'fullName email avatarUrl',
            })
            .exec()

        if (!post) {
            return response.status(404).json({
                message: 'Статья не найдена',
            })
        }

        return response.json(post)
    } catch (error) {
        console.log('~ ~ file: PostController.ts  ~ remove ~ error', error)
        return response.status(500).json({
            message: 'Не удалось удалить статью',
        })
    }
}

export const update = async (request: Request, response: Response) => {
    try {
        const post = await PostModel.findByIdAndUpdate(
            {
                _id: request.params.id,
            },
            {
                title: request.body.title,
                text: request.body.text,
                imageUrl: request.body.imageUrl,
                tags: request.body.tags,
                user: request.userId,
            },
            {
                returnDocument: 'after',
            },
        )

        if (!post) {
            return response.status(404).json({
                message: 'Статья не найдена',
            })
        }

        return response.json(post)
    } catch (error) {
        console.log('~ ~ file: PostController.ts  ~ getOne ~ error', error)
        return response.status(500).json({
            message: 'Не удалось обновить статью',
        })
    }
}

export const create = async (request: Request, response: Response) => {
    try {
        const doc = new PostModel({
            title: request.body.title,
            text: request.body.text,
            imageUrl: request.body.imageUrl,
            tags: request.body.tags,
            user: request.userId,
        })
        const post = await doc.save()
        return response.json(post)
    } catch (error) {
        console.log('~ ~ file: PostController.ts ~ create ~ error', error)
        return response.status(500).json({
            message: 'Не удалось создать статью',
        })
    }
}
