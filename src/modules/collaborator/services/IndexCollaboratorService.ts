import { injectable, inject } from 'tsyringe'

import ICollaboratorRepository from '../repositories/ICollaboratorRepository'
import Collaborator from '../infra/typeorm/entities/Collaborator'

@injectable()
class IndexCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  public async execute(): Promise<Collaborator[]> {
    const collaborators = await this.collaboratorRepository.findAll()

    return collaborators[0]
  }
}

export default IndexCollaboratorService
