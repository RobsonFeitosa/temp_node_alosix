import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.multer)

usersRouter.post('/', usersController.create)
usersRouter.get('/teste', usersController.teste)
usersRouter.post('/migrate', usersController.createMigration)

usersRouter.use(ensureAuthenticated)

usersRouter.put('/:user_id', usersController.update)

usersRouter.get('/count', usersController.indexCount)
usersRouter.get('/', usersController.index)
usersRouter.get('/:user_id', usersController.show)

usersRouter.delete('/:user_id', usersController.delete)

usersRouter.patch(
  '/avatar/:user_id',
  upload.single('avatar'),
  usersController.updateAvatar,
)

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
)

export default usersRouter
