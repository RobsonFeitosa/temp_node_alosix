import { injectable, inject } from 'tsyringe'

import { ICreateMappingReportDTO } from '../dtos/ICreateMappingReportDTO'
import ICollaboratorRepository from '../repositories/ICollaboratorRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
  userId: string
  data: ICreateMappingReportDTO
}

@injectable()
class CreateMappingReportService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(payload: IRequest): Promise<void> {
    console.log('create mapping')
  }
}

export default CreateMappingReportService
