import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO'
import ICalculatorProvider from '../providers/CalculatorEngineProvider/models/ICalculatorProvider'
import ISampleRepository from '../repositories/ISampleRepository'
import ParseDateSample from '../utils/parseDateSample'

@injectable()
class ShowSortIdSamplesService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('CalculatorProvider')
    private calculatorProvider: ICalculatorProvider,
  ) {}

  public async execute(sample_id: string): Promise<ISamplesResponseDTO> {
    if (sample_id.length < 11) {
      throw new AppError('Code sintaxy with error')
    }

    const sample = await this.sampleRepository.findByIdSort(sample_id)

    if (!sample) {
      throw new AppError('Sample does not found')
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

    /// /
    // Engine Calculate and interpratation
    //
    const calculationsReport_ = this.calculatorProvider.calculatorEngine(sample)

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
  }
}

export default ShowSortIdSamplesService
