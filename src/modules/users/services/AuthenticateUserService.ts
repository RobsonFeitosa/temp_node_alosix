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

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: UserPromise
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    console.log('teste finall')

    if (!user) throw new AppError('Incorrect email/password combination.', 401)

    const userSettings = await this.userSettingsRepository.findById(
      user.settings_id,
    )

    if (!userSettings) throw new AppError('Settings not found.', 404)

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!userSettings.actived) {
      this.sendActivedUserEmail(user)
      return { user: {} as UserPromise, token: 'inactive-user--resend-mail' }
    }

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const newUser: UserPromise = { ...userSettings, ...user }

    delete newUser.password

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user: { ...newUser }, token }
  }

  public async sendActivedUserEmail(user: User) {
    const { token } = await this.userTokensRepository.generate(user.id)

    const activedTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'actived_account.hbs',
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Alosix] Ativação da conta',
      templateData: {
        file: activedTemplate,
        variables: {
          name: user.name,
          token,
          link: `${process.env.APP_WEB_URL}/actived/?token=${token}`,
        },
      },
    })
  }
}

export default AuthenticateUserService
