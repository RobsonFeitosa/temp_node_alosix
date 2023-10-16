import { injectable, inject } from 'tsyringe'

import pagarme from 'pagarme'
import { ITransactionDTO } from '../../dtos/ITransactionsDTO'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import IUserTransactionsRepository from '../repositories/IUserTransactionsRepository'
import { IUserTransactionsDTO } from '@modules/dtos/IUserTransactionsDTO'
import UserTransaction from '../infra/typeorm/entities/UserTransactions'

interface ITransactions {
  total: number
  data: UserTransaction[]
}

@injectable()
class IndexTransactionService {
  constructor(
    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,
  ) {}

  public async execute(options: IPaginationOptionsDTO): Promise<ITransactions> {
    const transactions =
      await this.userTransactionsRepository.findAndCount(options)

    return transactions
  }
}

export default IndexTransactionService
