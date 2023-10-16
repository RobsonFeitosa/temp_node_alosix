import { Router } from 'express'

import samplesRouter from '@modules/calculations/infra/http/routes/samples.routes'

import transactionsRouter from '@modules/users/infra/http/routes/transactions.routes'
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sesionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import creditCardRouter from '@modules/users/infra/http/routes/creditCard.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import addressRouter from '@modules/users/infra/http/routes/address.routes'
import contactRouter from '@modules/users/infra/http/routes/contact.routes'
import accountRouter from '@modules/users/infra/http/routes/account.routes'
import commentRoutes from '@modules/users/infra/http/routes/comment.routes'
import settingsRouter from '@modules/settings/infra/http/routes/settings.routes'
import collaboratorRouter from '@modules/collaborator/infra/http/routes/collaborator.routes'
import mappingReportRouter from '@modules/collaborator/infra/http/routes/mappingReport.routes'

const routes = Router()

routes.use('/actived', accountRouter)
routes.use('/samples', samplesRouter)
routes.use('/users', usersRouter)
routes.use('/orders', ordersRouter)
routes.use('/contact', contactRouter)
routes.use('/transactions', transactionsRouter)
routes.use('/sessions', sesionsRouter)
routes.use('/card', creditCardRouter)
routes.use('/password', passwordRouter)
routes.use('/address', addressRouter)
routes.use('/settings', settingsRouter)
routes.use('/comments', commentRoutes)
routes.use('/collaborator', collaboratorRouter, mappingReportRouter)

export default routes
