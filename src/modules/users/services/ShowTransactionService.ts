import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import UserTransactions from '../infra/typeorm/entities/UserTransactions'
import IUserTransactionsRepository from '../repositories/IUserTransactionsRepository'

@injectable()
class ShowTransactionService {
  constructor(
    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,
  ) {}

  public async execute(id: string): Promise<UserTransactions> {
    const transaction = await this.userTransactionsRepository.findById(id)

    if (!transaction) throw new AppError('Transaction not found')

    return transaction
  }
}

export default ShowTransactionService
