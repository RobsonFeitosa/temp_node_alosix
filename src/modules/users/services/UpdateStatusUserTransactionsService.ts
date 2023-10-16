import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import path from 'path'

import IUserTransactionsRepository from '../repositories/IUserTransactionsRepository'
import UserTransaction from '../infra/typeorm/entities/UserTransactions'
import IUsersRepository from '../repositories/IUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import User from '../infra/typeorm/entities/User'
import formatValue from '@modules/utils/formatValue'

interface IRequest {
  idTransaction: string
  status: string
}

@injectable()
class UpdateStatusUserTransactionsService {
  constructor(
    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    status,
    idTransaction,
  }: IRequest): Promise<UserTransaction> {
    const transaction =
      await this.userTransactionsRepository.findById(idTransaction)

    if (!transaction) throw new AppError('Transaction not found')

    transaction.status = status

    await this.sendEmail(transaction)

    await this.userTransactionsRepository.save(transaction)

    return transaction
  }

  private async sendEmail(transaction: UserTransaction): Promise<void> {
    const user = await this.usersRepository.findById(transaction.user_id)

    if (!user) throw new AppError('User does not exists.')

    const template = path.resolve(__dirname, '..', 'views', 'receipt.hbs')

    const idOrder = transaction.order_id.substr(0, 11)

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: `[Alosix] Recibo - ${idOrder}`,
      templateData: {
        file: template,
        variables: {
          name: user.name,
          total: formatValue(transaction.amount / 100),
          idOrder,
          discount: 0,
          netTotal: formatValue(transaction.amount / 100),
        },
      },
    })
  }
}

export default UpdateStatusUserTransactionsService
