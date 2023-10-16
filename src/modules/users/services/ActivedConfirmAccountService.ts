import { injectable, inject } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUserSettingsRepository from '../repositories/IUserSettingsRepository'

interface IRequest {
  token: string
  actived: boolean
}

@injectable()
class ActivedConfirmAccountService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, actived }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) throw new AppError('user token does not exists')

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) throw new AppError('User does not exists')

    const userSettings = await this.userSettingsRepository.findById(
      user.settings_id,
    )

    if (!userSettings) throw new AppError('Settings not found.', 404)

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired')

    userSettings.actived = actived

    await this.userSettingsRepository.save(userSettings)
  }
}

export default ActivedConfirmAccountService
