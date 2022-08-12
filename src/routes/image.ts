import { Request, Response, Router } from 'express'

import { ImageMiddleware } from '../middleware/index.js'
import { checkAuth } from '../utils/index.js'

const imageRouter = Router()

imageRouter.post('/', checkAuth, ImageMiddleware.uploadToAmazon, async (request: Request, response: Response) =>
    response.json({
        url: request.fileUrl,
    }),
)

imageRouter.delete('/', checkAuth, ImageMiddleware.removeOnAmazon, async (_, response: Response) =>
    response.json({
        success: true,
    }),
)

export default imageRouter
