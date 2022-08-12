import { Router } from 'express'

import authRouter from './auth.js'
import imageRouter from './image.js'
import postsRouter from './posts.js'
import userRouter from './user.js'

const router = Router()

router.use('/posts', postsRouter)
router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/image', imageRouter)

export default router
