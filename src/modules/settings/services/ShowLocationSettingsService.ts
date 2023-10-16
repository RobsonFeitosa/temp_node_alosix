import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ISettingsRepository from '../repositories/ISettingsRepository'

import Settings from '../infra/typeorm/entities/Settings'

@injectable()
class CreateSettingsService {
  constructor(
    @inject('SettingsRepository')
    private settingsRepository: ISettingsRepository,
  ) {}

  public async execute(location: string): Promise<Settings> {
    const setting = await this.settingsRepository.findByLocation(location)

    if (!setting) {
      throw new AppError('Setting does not found')
    }

    return setting
  }
}

export default CreateSettingsService
