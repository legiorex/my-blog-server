import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'path'

import { regionAmazon } from '../config.js'
import { s3Client } from '../utils/index.js'

const bucket = process.env.AMAZON_BUCKET_NAME

export const uploadToAmazon = async (request: Request, response: Response, next: NextFunction) => {
    if (request.files) {
        const fileName = `images/${new Date().getTime()}-${(request.files.image as UploadedFile).name}`

        try {
            await s3Client.send(
                new PutObjectCommand({
                    Bucket: bucket,
                    Body: (request.files.image as UploadedFile).data,
                    Key: fileName,
                }),
            )
            const fileUrl = `https://${bucket}.s3.${regionAmazon}.amazonaws.com/${fileName}`

            request.fileUrl = fileUrl
        } catch (error) {
            return response.status(403).json({
                message: 'Не удалось загрузить картинку',
            })
        }
    }

    return next()
}

export const removeOnAmazon = async (request: Request, response: Response, next: NextFunction) => {
    const fileName = path.basename(request.body.imageUrl)

    try {
        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: bucket,
                Key: `images/${fileName}`,
            }),
        )
    } catch (error) {
        return response.status(403).json({
            message: 'Не удалось удалить картинку',
        })
    }

    return next()
}
