import { Router } from 'express'

import AddressController from '../controllers/AddressController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const addressRouter = Router()
const addressController = new AddressController()

addressRouter.use(ensureAuthenticated)

addressRouter.post('/', addressController.create)
addressRouter.get('/profile', addressController.show)
addressRouter.get('/', addressController.index)
addressRouter.put('/:addressId', addressController.update)

export default addressRouter
