import { Router } from 'express'

import { UserController } from '../controllers/index.js'
import { handleValidationErrors } from '../utils/index.js'
import { signInValidator, signUpValidator } from '../validations/index.js'

const authRouter = Router()

authRouter.post('/sign-in', signInValidator, handleValidationErrors, UserController.singIn)
authRouter.post('/sign-up', signUpValidator, handleValidationErrors, UserController.signUp)

export default authRouter
