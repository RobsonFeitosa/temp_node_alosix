import { Router } from 'express'

import ActivedSendEmailAccountController from '../controllers/ActivedSendEmailAccountController'
import ActivedConfirmAccountController from '../controllers/ActivedConfirmAccountController'

const accountRouter = Router()
const activedSendEmailAccountController =
  new ActivedSendEmailAccountController()
const activedConfirmAccountController = new ActivedConfirmAccountController()

accountRouter.post('/sendmail', activedSendEmailAccountController.create)
accountRouter.post('/confirm', activedConfirmAccountController.create)

export default accountRouter
