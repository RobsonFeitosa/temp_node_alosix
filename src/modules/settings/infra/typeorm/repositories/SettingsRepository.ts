import { getRepository, Repository } from 'typeorm'

import ISettingsRepository from '@modules/settings/repositories/ISettingsRepository'
import ICreateSettingsDTO from '@modules/settings/dtos/ICreateSettingsDTO'

import Settings from '../entities/Settings'

class SettingsRepository implements ISettingsRepository {
  private ormRepository: Repository<Settings>

  constructor() {
    this.ormRepository = getRepository(Settings)
  }

  public async create(settingsData: ICreateSettingsDTO): Promise<Settings> {
    const setting = this.ormRepository.create(settingsData)

    await this.ormRepository.save(setting)

    return setting
  }

  public async findById(settingId: string): Promise<Settings | undefined> {
    const setting = await this.ormRepository.findOne(settingId)

    return setting
  }

  public async findByLocation(location: string): Promise<Settings | undefined> {
    const setting = await this.ormRepository.findOne({
      where: {
        location,
      },
    })

    return setting
  }

  public async save(settingsData: Settings): Promise<Settings> {
    return this.ormRepository.save(settingsData)
  }
}

export default SettingsRepository
