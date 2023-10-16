import { injectable, inject } from 'tsyringe'

import ISampleRepository from '../repositories/ISampleRepository'

@injectable()
class IndexCountSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,
  ) {}

  public async execute(): Promise<number> {
    const count = await this.sampleRepository.findCount()

    return count
  }
}

export default IndexCountSampleService
