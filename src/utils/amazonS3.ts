import { S3Client } from '@aws-sdk/client-s3'

import { regionAmazon } from '../config.js'

export const s3Client = new S3Client({
    region: regionAmazon,
    credentials: {
        accessKeyId: 'AKIAT73WNBX4L7DMLMZ3',
        secretAccessKey: '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',
    },
})
