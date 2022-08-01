import { Router } from 'express'

import { UserController } from '../controllers/index.js'
import { checkAuth } from '../utils/index.js'

const userRouter = Router()
userRouter.get('/', checkAuth, UserController.getUser)

export default userRouter
