import { S3Client } from '@aws-sdk/client-s3'

import { regionAmazon } from '../config.js'

export const s3Client = new S3Client({
    region: regionAmazon,
    credentials: {
        accessKeyId: process.env.AMAZON_KEY_ID!,
        secretAccessKey: process.env.AMAZON_SECRET_KEY!,
    },
})
