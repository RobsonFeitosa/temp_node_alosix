import { getRepository, Repository } from 'typeorm'

import IUserSettingsRepository from '@modules/users/repositories/IUserSettingsRepository'
import ICreateUserSettingsDTO from '@modules/users/dtos/ICreateUserSettingsDTO'

import UserSettings from '../entities/UserSettings'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

interface IFindAllUser {
  data: UserSettings[]
  total: number
}

class UserSettingsRepository implements IUserSettingsRepository {
  private ormRepository: Repository<UserSettings>

  constructor() {
    this.ormRepository = getRepository(UserSettings)
  }

  public async create(
    settingsData: ICreateUserSettingsDTO,
  ): Promise<UserSettings> {
    const userSettings = this.ormRepository.create(settingsData)

    await this.ormRepository.save(userSettings)

    return userSettings
  }

  public async findByUser(userId: string): Promise<UserSettings | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        user_id: userId,
      },
    })

    return user
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<IFindAllUser> {
    const builder = this.ormRepository.createQueryBuilder('users_settings')

    const total = await builder.getCount()
    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .addOrderBy('users_settings.created_at')
        .leftJoinAndSelect('users_settings.user', 'user')
        .take(options.limit)
        .getMany()

      return { total, data }
    }
    const data = await builder.getMany()

    return { total, data }
  }

  public async findById(id: string): Promise<UserSettings | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async save(userSettings: UserSettings): Promise<UserSettings> {
    return this.ormRepository.save(userSettings)
  }
}

export default UserSettingsRepository
