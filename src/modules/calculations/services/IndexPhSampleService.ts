import { inject, injectable } from 'tsyringe'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO'
import ICalculatorProvider from '../providers/CalculatorEngineProvider/models/ICalculatorProvider'
import ISampleRepository from '../repositories/ISampleRepository'
import ParseDateSample from '../utils/parseDateSample'

interface IPromiseSample {
  total: number
  data: ISamplesResponseDTO[]
}

interface IRequest extends IPaginationOptionsDTO {
  min: number
  max: number
  unity: string
}

@injectable()
class IndexPhSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('CalculatorProvider')
    private calculatorProvider: ICalculatorProvider,
  ) {}

  public async execute(options: IRequest): Promise<IPromiseSample> {
    const dataSamples = await this.sampleRepository.findPh({
      limit: options.limit,
      page: options.page,
      min: options.min,
      max: options.max,
      unity: options.unity,
    })

    const reports = dataSamples.data.map((sample) => {
      const {
        id,
        user_id,
        description_cuture,
        city,
        uf,
        created_at,
        updated_at,
      } = sample

      /// /
      // Engine Calculate and interpratation
      //
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

    return { total: dataSamples.total, data: reports }
  }
}

export default IndexPhSampleService
