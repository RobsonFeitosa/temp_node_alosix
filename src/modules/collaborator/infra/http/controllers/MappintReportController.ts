import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateMappingReportService from '@modules/collaborator/services/CreateMappingReportService'

export default class MappintReportController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params
    const data = req.body.data

    const createMappingReport = container.resolve(CreateMappingReportService)

    const mapping = await createMappingReport.execute({
      userId,
      data,
    })

    return res.json(mapping)
  }
}
