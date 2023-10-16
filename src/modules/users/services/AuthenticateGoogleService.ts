import { injectable, inject } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'

import path from 'path'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import IUserSettingsRepository from '../repositories/IUserSettingsRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import User from '../infra/typeorm/entities/User'
import { UserPromise } from '../dtos/IPromiseUser'
import IUserTokensRepository from '../repositories/IUserTokensRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IGoogleProvider from '../providers/AuthProvider/models/IGoogleProvider'

interface IRequest {
  credential: string
  clientId: string
}

interface IResponse {
  user: UserPromise
  token: string
}

@injectable()
class AuthenticateGoogleService {
  constructor(
    @inject('GoogleProvider')
    private googleProvider: IGoogleProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,
  ) {}

  public async execute({ credential, clientId }: IRequest): Promise<IResponse> {
    const people = await this.googleProvider.getInfo(credential, clientId)

    const user = await this.usersRepository.findByEmail(people.email ?? '')

    if (!user) {
      const userSettings = await this.userSettingsRepository.create({
        actived: true,
        is_first_calculation: true,
        level: 2,
      })

      const user = await this.usersRepository.create({
        email: people.email ?? '',
        name: people.name ?? '',
        password: (people.at_hash || people.jti) ?? '',
        settings_id: userSettings.id,
      })

      const token = this.tokenSign(user.id)

      const newUser: UserPromise = { ...userSettings, ...user }

      delete newUser.password

      return { user: newUser, token }
    }

    const token = this.tokenSign(user?.id ?? '')

    const userSettings = await this.userSettingsRepository.findById(
      user.settings_id,
    )

    if (!userSettings) throw new AppError('Settings not found.', 404)

    const newUser: UserPromise = { ...userSettings, ...user }

    delete newUser.password

    return { user: newUser, token }
  }

  private tokenSign(userId: string): string {
    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: userId,
      expiresIn,
    })

    return token
  }
}

export default AuthenticateGoogleService
