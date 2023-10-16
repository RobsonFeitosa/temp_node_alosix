import { injectable, inject } from 'tsyringe'
import path from 'path'

import iMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  assunto: string
  message: string
}

@injectable()
class SendContactEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: iMailProvider,
  ) {}

  public async execute({
    name,
    email,
    assunto,
    message,
  }: IRequest): Promise<void> {
    const contactTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'contact.hbs',
    )

    const mailFert = 'contato@alosix.com'

    await this.mailProvider.sendMail({
      to: {
        name,
        email: mailFert,
      },
      subject: `Contato - ${name} - [Alosix]`,
      templateData: {
        file: contactTemplate,
        variables: {
          name,
          assunto,
          email,
          message,
        },
      },
    })
  }
}

export default SendContactEmailService
