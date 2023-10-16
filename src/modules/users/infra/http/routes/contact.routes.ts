import { Router } from 'express'

import ContactController from '../controllers/ContactController'

const passwordRouter = Router()
const contactController = new ContactController()

passwordRouter.post('/', contactController.create)

export default passwordRouter
