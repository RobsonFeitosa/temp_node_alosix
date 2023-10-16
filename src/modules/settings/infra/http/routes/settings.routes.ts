import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import SettingsController from '../controllers/SettingsController'

const settingsRouter = Router()
const settingsController = new SettingsController()

settingsRouter.get('/:location', settingsController.show)

settingsRouter.use(ensureAuthenticated)
settingsRouter.post('/', settingsController.create)
settingsRouter.put('/:location', settingsController.update)

export default settingsRouter
