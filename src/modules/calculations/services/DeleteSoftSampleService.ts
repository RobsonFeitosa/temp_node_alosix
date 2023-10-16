import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import ISampleRepository from '../repositories/ISampleRepository'
interface IPromise {
  sample_deleted: string
}

@injectable()
class DeleteSoftSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,
  ) {}

  public async execute(sampleId: string): Promise<IPromise> {
    const sample = await this.sampleRepository.findById(sampleId)

    if (!sample) {
      throw new AppError('Sample does not found')
    }

    sample.deleted_at = new Date()

    await this.sampleRepository.save([sample])

    return {
      sample_deleted: sample.id,
    }
  }
}

export default DeleteSoftSampleService
