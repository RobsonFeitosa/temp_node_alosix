import { Router } from 'express'

import multer from 'multer'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import SamplesController from '../controllers/SamplesController'
import FilterSampleController from '../controllers/FilterSampleController'

const calculationRouter = Router()
const samplesController = new SamplesController()
const filterSampleController = new FilterSampleController()

calculationRouter.get('/id/:sampleId', filterSampleController.showPublic)

const upload = multer(uploadConfig.multer)

// TODO: mover pdf extract para rotas autenticadas
calculationRouter.post(
  '/pdf-extract',
  upload.array('pdf'),
  samplesController.getPdfExtract,
)

calculationRouter.use(ensureAuthenticated)

calculationRouter.get('/sort/:sortId', filterSampleController.show)
calculationRouter.get('/ph/', filterSampleController.IndexPh)
calculationRouter.get('/nameUser/', filterSampleController.IndexNameUser)
calculationRouter.get('/chart', filterSampleController.indexChart)
calculationRouter.get('/count', filterSampleController.indexCount)
calculationRouter.get('/limit/:limitNumber', filterSampleController.indexLimit)

calculationRouter.post('/', samplesController.create)
calculationRouter.get('/all', samplesController.all)
calculationRouter.get('/', samplesController.index)
calculationRouter.patch(
  '/adding-calculations/:sampleId',
  samplesController.updateAddingCalculations,
)
calculationRouter.patch(
  '/update-change-user-sample',
  samplesController.changeUserSample,
)
calculationRouter.patch('/:sampleId', samplesController.deleteSoft)
calculationRouter.get('/meta', samplesController.showMeta)
calculationRouter.get('/:sampleId', samplesController.show)
// calculationRouter.put('/:sampleId', samplesController.update);

export default calculationRouter
