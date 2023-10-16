import { injectable, inject } from 'tsyringe'
import path from 'path'

import iMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface IRequest {
  email: string
}

@injectable()
class SendActivedUserEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: iMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('User does not exists.')

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

export default SendActivedUserEmailService
