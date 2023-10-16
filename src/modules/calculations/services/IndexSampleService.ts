import { inject, injectable } from 'tsyringe'

import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO'

import Sample from '../infra/typeorm/entities/Samples'

import ISampleCalculatedRepository from '../repositories/ISampleCalculatedRepository'

import ISampleRepository from '../repositories/ISampleRepository'
import ParseDateSample from '../utils/parseDateSample'

interface IPromiseSample {
  total: number
  data: ISamplesResponseDTO[]
}

interface IRequest {
  options: IPaginationOptionsDTO
  userId: string
}

@injectable()
class IndexSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('SampleCalculatedRepository')
    private sampleCalculatedRepository: ISampleCalculatedRepository,
  ) {}

  public async execute({ options, userId }: IRequest): Promise<IPromiseSample> {
    const { data, total } = await this.sampleRepository.findAndCount({
      ...options,
      user_id: userId,
    })

    const reportAll = await Promise.all(
      data.map(async (sample: Sample) => {
        const {
          id,
          user_id,
          description_cuture,
          city,
          uf,
          created_at,
          updated_at,
        } = sample

        const sampleCalculated =
          await this.sampleCalculatedRepository.findBySampleId(id)

        const calculations_ =
          sampleCalculated && JSON.parse(sampleCalculated.calculation)
        const interpretation =
          sampleCalculated && JSON.parse(sampleCalculated.interpretation)

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
      }),
    )

    return { total, data: reportAll } as IPromiseSample
  }
}

export default IndexSampleService
