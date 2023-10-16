import { Router } from 'express'

import multer from 'multer'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import CollaboratorController from '../controllers/CollaboratorController'

const collaboratorRouter = Router()
const collaboratorController = new CollaboratorController()

const upload = multer(uploadConfig.multer)

collaboratorRouter.get('/', collaboratorController.index)

collaboratorRouter.use(ensureAuthenticated)

collaboratorRouter.post(
  '/:userId',
  upload.single('logo'),
  collaboratorController.create,
)

export default collaboratorRouter
