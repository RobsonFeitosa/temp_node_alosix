import { Router } from 'express'

import TransactionsControllers from '../controllers/TransactionsControllers'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const transactionsRouter = Router()
const transactionsControllers = new TransactionsControllers()

transactionsRouter.use(ensureAuthenticated)

transactionsRouter.post('/', transactionsControllers.create)
transactionsRouter.get('/', transactionsControllers.index)
transactionsRouter.get('/:idTransaction', transactionsControllers.show)
transactionsRouter.get('/count', transactionsControllers.indexCount)
transactionsRouter.put('/:idTransaction', transactionsControllers.update)
transactionsRouter.post('/pix', transactionsControllers.createPix)

export default transactionsRouter
