import { Router } from 'express'

import CommentController from '../controllers/CommentController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const commentsRouter = Router()
const commentController = new CommentController()

commentsRouter.use(ensureAuthenticated)

commentsRouter.post('/', commentController.create)
commentsRouter.get('/:commentId', commentController.show)
commentsRouter.delete('/:commentId', commentController.delete)
commentsRouter.get('/', commentController.index)
export default commentsRouter
