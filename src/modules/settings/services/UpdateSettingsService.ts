import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ISettingsRepository from '../repositories/ISettingsRepository'

import Settings from '../infra/typeorm/entities/Settings'

interface IRequest {
  location: string
  dataSetting: Settings
}

@injectable()
class CreateSettingsService {
  constructor(
    @inject('SettingsRepository')
    private settingsRepository: ISettingsRepository,
  ) {}

  public async execute({ location, dataSetting }: IRequest): Promise<Settings> {
    const setting = await this.settingsRepository.findByLocation(location)

    if (!setting) {
      throw new AppError('Setting does not found')
    }

    setting.title = dataSetting.title
    setting.subtitle1 = dataSetting.subtitle1
    setting.description1 = dataSetting.description1
    setting.subtitle2 = dataSetting.subtitle2
    setting.description2 = dataSetting.description2
    setting.subtitle3 = dataSetting.subtitle3
    setting.description3 = dataSetting.description3

    await this.settingsRepository.save(setting)

    return setting
  }
}

export default CreateSettingsService
