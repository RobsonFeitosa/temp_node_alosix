import { getRepository, Repository } from 'typeorm'

import IUserTransactionsRepository from '@modules/users/repositories/IUserTransactionsRepository'
import ICreateTransactionsDTO from '@modules/users/dtos/ICreateUserTransactionsDTO'

import Transaction from '../entities/UserTransactions'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import { IUserTransactionsDTO } from '@modules/dtos/IUserTransactionsDTO'

interface IFindAllTransaction {
  data: IUserTransactionsDTO[]
  total: number
}

class UserTransactionsRepository implements IUserTransactionsRepository {
  private ormRepository: Repository<Transaction>

  constructor() {
    this.ormRepository = getRepository(Transaction)
  }

  public async create(
    settingsData: ICreateTransactionsDTO,
  ): Promise<Transaction> {
    const Transactions = this.ormRepository.create(settingsData)

    await this.ormRepository.save(Transactions)

    return Transactions
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<IFindAllTransaction> {
    const builder = this.ormRepository.createQueryBuilder('user_transactions')

    const total = await builder.getCount()
    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .leftJoinAndSelect('user_transactions.order', 'orders')
        .leftJoinAndSelect('user_transactions.user', 'users')
        .addOrderBy('user_transactions.created_at', 'DESC')
        .take(options.limit)
        .getMany()

      return { total, data }
    }
    const data = await builder.getMany()

    return { total, data }
  }

  public async save(Transaction: Transaction): Promise<Transaction> {
    return this.ormRepository.save(Transaction)
  }
}

export default UserTransactionsRepository
