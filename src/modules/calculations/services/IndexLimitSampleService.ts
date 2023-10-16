import { injectable, inject } from 'tsyringe'

import ISampleRepository from '../repositories/ISampleRepository'

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO'
import ICalculatorProvider from '../providers/CalculatorEngineProvider/models/ICalculatorProvider'
import ParseDateSample from '../utils/parseDateSample'

@injectable()
class IndexLimitSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('CalculatorProvider')
    private calculatorProvider: ICalculatorProvider,
  ) {}

  public async execute(limitNumber: string): Promise<ISamplesResponseDTO[]> {
    const dataSamples = await this.sampleRepository.findLimit(limitNumber)

    const reports = dataSamples.map((sample) => {
      const {
        id,
        user_id,
        description_cuture,
        city,
        uf,
        created_at,
        updated_at,
      } = sample

      const calculationsReport_ =
        this.calculatorProvider.calculatorEngine(sample)

      const parseDateSample = new ParseDateSample()

      const report = {
        id,
        user_id,
        description_cuture,
        ...{ data_sample: parseDateSample.convertProcess(sample) },
        ...calculationsReport_,
        city,
        uf,
        created_at,
        updated_at,
      }

      return report
    })

    return reports
  }
}

export default IndexLimitSampleService
