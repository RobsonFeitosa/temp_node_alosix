import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import { ICreateCollaboratorDTO } from '../dtos/ICreateCollaboratorDTO'
import ICollaboratorRepository from '../repositories/ICollaboratorRepository'
import Collaborator from '../infra/typeorm/entities/Collaborator'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
  userId: string
  data: ICreateCollaboratorDTO
}

@injectable()
class CreateCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(payload: IRequest): Promise<Collaborator> {
    const { data, userId } = payload

    const checkCollaboratorExist = await this.collaboratorRepository.findByName(
      data.name,
    )

    if (checkCollaboratorExist) {
      throw new AppError('Collaborator already used.')
    }

    const collaborator = await this.collaboratorRepository.create({
      ...data,
      user_id: userId,
    })

    if (collaborator.logo) {
      await this.storageProvider.deleteFile(collaborator.logo)
    }

    const filename = await this.storageProvider.saveFile(data.logo)

    collaborator.logo = filename

    await this.collaboratorRepository.save(collaborator)

    return collaborator
  }
}

export default CreateCollaboratorService
