import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserSettingsRepository from '../repositories/IUserSettingsRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import { UserPromise } from '../dtos/IPromiseUser'

interface IRequest {
  name: string
  email: string
  password: string
  user_id: string
  level: 1 | 2
  cpf?: string
  phone_number?: string
  actived: boolean
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(userData: IRequest[]): Promise<void> {
    userData.forEach(async (user) => {
      const checkUserExists = await this.usersRepository.findByEmail(user.email)
      if (!checkUserExists) {
        const { name, password, email, ...settings } = user

        const userSettings = await this.userSettingsRepository.create({
          ...settings,
        })

        await this.usersRepository.create({
          email,
          name,
          password,
          settings_id: userSettings.id,
        })
      }
    })
  }
}

export default CreateUserService
