import { Router } from 'express'

import authRouter from './auth.js'
import postsRouter from './posts.js'
import userRouter from './user.js'

const router = Router()

router.use('/posts', postsRouter)
router.use('/user', userRouter)
router.use('/auth', authRouter)

export default router
