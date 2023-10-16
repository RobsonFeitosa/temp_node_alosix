import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ISettingsRepository from '../repositories/ISettingsRepository'

import Settings from '../infra/typeorm/entities/Settings'

import ICreateSettingsDTO from '../dtos/ICreateSettingsDTO'

interface IRequest {
  dataSettings: ICreateSettingsDTO
  userId: string
}

@injectable()
class CreateSettingsService {
  constructor(
    @inject('SettingsRepository')
    private settingsRepository: ISettingsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ dataSettings, userId }: IRequest): Promise<Settings> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not found')
    }

    const newSettings = { ...dataSettings }

    newSettings.user_id = userId

    const settings = await this.settingsRepository.create(newSettings)

    return settings
  }
}

export default CreateSettingsService
