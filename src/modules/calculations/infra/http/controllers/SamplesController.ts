import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateSampleService from '@modules/calculations/services/CreateSampleService'
import IndexSampleService from '@modules/calculations/services/IndexSampleService'
import ShowSampleService from '@modules/calculations/services/ShowSampleService'
import IndexAllSampleService from '@modules/calculations/services/IndexAllSampleService'
import DeleteSoftSampleService from '@modules/calculations/services/DeleteSoftSampleService'
import UpdateSampleOfUsersService from '@modules/calculations/services/UpdateSampleOfUsersService'
import UpdateAddingCalculationsSampleService from '@modules/calculations/services/UpdateAddingCalculationsSampleService'
import ShowPdfExtractService from '@modules/calculations/services/ShowPdfExtractService'
import ShowMetaSampleService from '@modules/calculations/services/ShowMetaSampleService'

export default class CalculationsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id

    const dataSamples = req.body

    const createSample = container.resolve(CreateSampleService)

    const sample = await createSample.execute({
      user_id: userId,
      dataSamples,
    })

    return res.json(classToClass(sample))
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { sampleId } = req.params

    const showSample = container.resolve(ShowSampleService)

    const sample = await showSample.execute(sampleId)
    const response = classToClass(sample)
    return res.json(response)
  }

  public async showMeta(req: Request, res: Response): Promise<Response> {
    const showSampleMeta = container.resolve(ShowMetaSampleService)

    const sample = await showSampleMeta.execute(req.user.id)
    const response = classToClass(sample)
    return res.json(response)
  }

  public async getPdfExtract(req: Request, res: Response): Promise<Response> {
    const { idCollaborator } = req.params
    const showSample = container.resolve(ShowPdfExtractService)

    const samples = await showSample.execute({
      files: req.files,
    })

    return res.json(samples)
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit } = req.query
    const userId = req.user.id

    const indexSample = container.resolve(IndexSampleService)

    const response = await indexSample.execute({
      options: {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      },
      userId,
    })

    return res.json(response)
  }

  public async all(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit } = req.query

    const indexSample = container.resolve(IndexAllSampleService)

    const response = await indexSample.execute({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    })

    return res.json(response)
  }

  public async deleteSoft(req: Request, res: Response): Promise<any> {
    const { sampleId } = req.params

    const removeSample = container.resolve(DeleteSoftSampleService)

    const response = await removeSample.execute(sampleId)

    return res.json(response)
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { sampleId } = req.params;
  //   const dataSample = req.body;

  //   const updateSample = container.resolve(
  //     UpdateSampleService,
  //   );

  //   const sample = await updateSample.execute({
  //     sampleId,
  //     dataSample,
  //   });

  //   return res.json(sample);
  // }

  public async updateAddingCalculations(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { sampleId } = req.params
    const dataSample = req.body

    const updateSample = container.resolve(
      UpdateAddingCalculationsSampleService,
    )

    const sample = await updateSample.execute({
      sampleId,
      dataSample,
    })

    return res.json(sample)
  }

  public async changeUserSample(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { sample_id, for_user_id } = req.body

    const updateSampleforUser = container.resolve(UpdateSampleOfUsersService)

    const sample = await updateSampleforUser.execute({
      sampleId: sample_id,
      forUserId: for_user_id,
    })

    return res.json(sample)
  }
}
