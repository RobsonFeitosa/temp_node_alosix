import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ISampleRepository from '../repositories/ISampleRepository'

@injectable()
class RemoveSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,
  ) {}

  public async execute(sample_id: string): Promise<void> {
    const sample = await this.sampleRepository.findById(sample_id)

    if (!sample) {
      throw new AppError('Sample does not found')
    }

    await this.sampleRepository.delete(sample_id)
  }
}

export default RemoveSampleService
