import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import { ICreateSample } from '../dtos/ICreateSampleDTO'
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO'

import Samples from '../infra/typeorm/entities/Samples'
import ICalculatorProvider from '../providers/CalculatorEngineProvider/models/ICalculatorProvider'
import ISampleRepository from '../repositories/ISampleRepository'
import ParseDateSample from '../utils/parseDateSample'

interface RequestDTO {
  sampleId: string
  forUserId: string
}

@injectable()
class UpdateSampleofUserService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('CalculatorProvider')
    private calculatorProvider: ICalculatorProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ sampleId, forUserId }: RequestDTO): Promise<void> {
    const foundSample = await this.sampleRepository.findById(sampleId)

    if (!foundSample) {
      throw new AppError('Sample not found')
    }

    const user = await this.usersRepository.findById(forUserId)

    if (!user) {
      throw new AppError('User not found')
    }

    const sampleUpdated: Samples = { ...foundSample }

    sampleUpdated.user_id = forUserId

    await this.sampleRepository.save([sampleUpdated])
  }
}

export default UpdateSampleofUserService
