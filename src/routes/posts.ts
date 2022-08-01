import { Router } from 'express'

import { PostController } from '../controllers/index.js'
import { checkAuth, handleValidationErrors } from '../utils/index.js'
import { postCreateValidation } from '../validations/index.js'

const postsRouter = Router()

postsRouter.get('/', PostController.getAll)
postsRouter.get('/:id', PostController.getOne)
postsRouter.post('/', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
postsRouter.patch('/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)
postsRouter.delete('/:id', checkAuth, PostController.remove)

export default postsRouter
