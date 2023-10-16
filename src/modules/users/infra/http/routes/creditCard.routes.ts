import { Router } from 'express'

import CreditCardController from '../controllers/CreditCardController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const cardRouter = Router()
const creditCardController = new CreditCardController()

cardRouter.use(ensureAuthenticated)

cardRouter.post('/', creditCardController.create)
cardRouter.get('/', creditCardController.index)
cardRouter.delete('/:cardId', creditCardController.delete)
cardRouter.get('/actived', creditCardController.showActived)
cardRouter.patch('/actived/:cardId', creditCardController.updateActived)
cardRouter.get('/:cardId', creditCardController.show)

export default cardRouter
