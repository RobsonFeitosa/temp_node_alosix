import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserSettingsRepository from '../repositories/IUserSettingsRepository'

import ICreateUserDTO from '../dtos/ICreateUserDTO'
import ICreateUserSettingsDTO from '../dtos/ICreateUserSettingsDTO'

import User from '../infra/typeorm/entities/User'

interface IUpdateUser extends ICreateUserSettingsDTO, ICreateUserDTO {}

interface IRequest {
  user_id: string
  userData: IUpdateUser
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, userData }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('User not found')
    }

    if (userData.name) {
      user.name = userData.name
    }

    if (userData.email) {
      user.email = userData.email
    }

    if (userData.level) {
      user.settings.level = userData.level
    }

    if (userData.actived) {
      user.settings.actived = userData.actived
    }

    if (userData.is_first_calculation) {
      user.settings.is_first_calculation = userData.is_first_calculation
    }

    if (userData.phone_number) {
      user.settings.phone_number = userData.phone_number
    }

    if (userData.cpf) {
      user.settings.cpf = userData.cpf
    }

    if (userData.password && !userData.old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      )
    }

    if (userData.password && userData.old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        userData.old_password,
        user.password,
      )

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.')
      }

      user.password = await this.hashProvider.generateHash(userData.password)
    }

    const userNew = await this.usersRepository.save(user)

    await this.userSettingsRepository.save(userNew.settings)

    return userNew
  }
}

export default UpdateUserService
