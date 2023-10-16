import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO'
import ISampleCalculatedRepository from '../repositories/ISampleCalculatedRepository'
import ISampleRepository from '../repositories/ISampleRepository'
import ParseDateSample from '../utils/parseDateSample'

@injectable()
class ShowSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('SampleCalculatedRepository')
    private sampleCalculatedRepository: ISampleCalculatedRepository,
  ) {}

  public async execute(sample_id: string): Promise<ISamplesResponseDTO> {
    const sample = await this.sampleRepository.findById(sample_id)

    if (!sample) {
      throw new AppError('Sample not found')
    }

    const {
      id,
      user_id,
      description_cuture,
      city,
      uf,
      created_at,
      updated_at,
    } = sample

    console.log({ idSample: sample.id })
    const sampleCalculated =
      await this.sampleCalculatedRepository.findBySampleId(sample.id)

    console.log({ sampleCalculated })
    const calculations_ =
      sampleCalculated && JSON.parse(sampleCalculated.calculation)
    const interpretation =
      sampleCalculated && JSON.parse(sampleCalculated.interpretation)

    console.log({ calculations_, interpretation })
    const parseDateSample = new ParseDateSample()

    const report = {
      id,
      user_id,
      description_cuture,
      ...{ data_sample: parseDateSample.convertProcess(sample) },
      calculations_,
      interpretation_: interpretation,
      city,
      uf,
      created_at,
      updated_at,
    }

    return report
  }
}

export default ShowSampleService
