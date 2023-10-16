import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'

import OrdersController from '../controller/OrdersController'

const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.use(ensureAuthenticated)

ordersRouter.post('/', ordersController.create)
ordersRouter.get('/', ordersController.index)
ordersRouter.get('/sample/:id', ordersController.indexOfSample)
ordersRouter.put('/:orderId', ordersController.update)
ordersRouter.get('/:id', ordersController.show)

export default ordersRouter
