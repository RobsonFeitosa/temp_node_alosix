import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import ISampleRepository from '../repositories/ISampleRepository'

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import ICalculatorProvider from '../providers/CalculatorEngineProvider/models/ICalculatorProvider'
import ParseDateSample from '../utils/parseDateSample'

interface IFindAllOfUserSample extends IPaginationOptionsDTO {
  nameUser: string
}

interface IPromiseSample {
  total: number
  data: ISamplesResponseDTO[]
}

@injectable()
class IndexOfUserSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CalculatorProvider')
    private calculatorProvider: ICalculatorProvider,
  ) {}

  public async execute(options: IFindAllOfUserSample): Promise<IPromiseSample> {
    const user = await this.usersRepository.findUserForName(options.nameUser)

    if (!user) {
      throw new AppError('User does not found')
    }

    const dataSamples = await this.sampleRepository.findAll({
      limit: options.limit,
      page: options.page,
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

export default IndexOfUserSampleService
