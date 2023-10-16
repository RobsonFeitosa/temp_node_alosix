import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ShowSortIdSamplesService from '@modules/calculations/services/ShowSortIdSamplesService'
import IndexOfUserSampleService from '@modules/calculations/services/IndexOfUserSampleService'
import IndexPhSampleService from '@modules/calculations/services/IndexPhSampleService'
import IndexChartsSampleService from '@modules/calculations/services/IndexChartsSampleService'
import IndexCountSampleService from '@modules/calculations/services/IndexCountSampleService'
import IndexLimitSampleService from '@modules/calculations/services/IndexLimitSampleService'
import ShowPublicSampleService from '@modules/calculations/services/ShowPublicSampleService'

export default class CalculationsController {
  public async showPublic(req: Request, res: Response): Promise<Response> {
    const { sampleId } = req.params

    const sampleShow = container.resolve(ShowPublicSampleService)

    const sample = await sampleShow.execute(sampleId)

    return res.json(classToClass(sample))
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { sortId } = req.params

    const showSample = container.resolve(ShowSortIdSamplesService)

    const sample = await showSample.execute(sortId.toUpperCase())

    return res.json(classToClass(sample))
  }

  public async IndexPh(req: Request, res: Response): Promise<Response> {
    const {
      min = 0,
      max = 9999,
      page = 1,
      limit = 10,
      unity = 'cacl',
    } = req.query

    const filter = container.resolve(IndexPhSampleService)

    const samples = await filter.execute({
      min: Number(min),
      max: Number(max),
      page: Number(page),
      limit: Number(limit),
      unity: String(unity),
    })

    return res.json(classToClass(samples))
  }

  public async IndexNameUser(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10, nameUser } = req.query

    const filter = container.resolve(IndexOfUserSampleService)

    const samples = await filter.execute({
      page: Number(page),
      limit: Number(limit),
      nameUser: String(nameUser),
    })

    return res.json(classToClass(samples))
  }

  public async indexChart(req: Request, res: Response): Promise<Response> {
    const filter = container.resolve(IndexChartsSampleService)

    const samples = await filter.execute()

    return res.json(samples)
  }

  public async indexCount(req: Request, res: Response): Promise<Response> {
    const count = container.resolve(IndexCountSampleService)

    const samplesCount = await count.execute()

    return res.json(samplesCount)
  }

  public async indexLimit(req: Request, res: Response): Promise<Response> {
    const { limitNumber } = req.params
    const limit = container.resolve(IndexLimitSampleService)

    const samples = await limit.execute(limitNumber)

    return res.json(samples)
  }
}
