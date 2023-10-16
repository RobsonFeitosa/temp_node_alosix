import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IUsersRepository from '../repositories/IUsersRepository'

import User from '../infra/typeorm/entities/User'
import IUserSettingsRepository from '../repositories/IUserSettingsRepository'
import { classToClass } from 'class-transformer'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    const settings = await this.userSettingsRepository.findById(
      user.settings_id,
    )
    if (!settings) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (settings.avatar) {
      await this.storageProvider.deleteFile(settings.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    settings.avatar = filename

    await this.usersRepository.save(user)
    user.settings = classToClass(settings)

    return user
  }
}

export default UpdateUserAvatarService
