import { inject, injectable } from 'tsyringe'
import ISampleCalculatedRepository from '../repositories/ISampleCalculatedRepository'
import ISampleRepository from '../repositories/ISampleRepository'

interface IResponse {
  total: number
  lastSampleName: string | undefined
}

@injectable()
class ShowMetaSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('SampleCalculatedRepository')
    private sampleCalculatedRepository: ISampleCalculatedRepository,
  ) {}

  public async execute(userId: string): Promise<IResponse> {
    const meta = await this.sampleRepository.findMeta(userId)

    return meta
  }
}

export default ShowMetaSampleService
