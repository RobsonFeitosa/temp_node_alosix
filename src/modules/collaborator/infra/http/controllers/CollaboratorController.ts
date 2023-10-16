import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateCollaboratorService from '@modules/collaborator/services/CreateCollaboratorService'
import { classToClass } from 'class-transformer'
import IndexCollaboratorService from '@modules/collaborator/services/IndexCollaboratorService'

export default class CollaboratorController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params
    const data = JSON.parse(req.body.data)
    const logo = req.file?.filename

    const createCollaborator = container.resolve(CreateCollaboratorService)

    const collaborator = await createCollaborator.execute({
      userId,
      data: { ...data, logo },
    })

    return res.json(classToClass(collaborator))
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const indexCollaborator = container.resolve(IndexCollaboratorService)

    const response = await indexCollaborator.execute()

    return res.json(classToClass(response))
  }
}
