import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import MappintReportController from '../controllers/MappintReportController'

const mappingReportRouter = Router()
const mappintReportController = new MappintReportController()

mappingReportRouter.use(ensureAuthenticated)
mappingReportRouter.post(
  '/:userId/mapping-report',
  mappintReportController.create,
)

export default mappingReportRouter
