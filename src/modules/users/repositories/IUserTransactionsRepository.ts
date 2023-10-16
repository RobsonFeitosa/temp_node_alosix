import UserTransaction from '../infra/typeorm/entities/UserTransactions'

import ICreateUserTransactionsDTO from '../dtos/ICreateUserTransactionsDTO'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import { IUserTransactionsDTO } from '@modules/dtos/IUserTransactionsDTO'

interface IFindAllTransaction {
  data: IUserTransactionsDTO[]
  total: number
}

export default interface ITransactionsUserRepository {
  create(transactionsData: ICreateUserTransactionsDTO): Promise<UserTransaction>
  findById(id: string): Promise<UserTransaction | undefined>
  findAndCount(optoins: IPaginationOptionsDTO): Promise<IFindAllTransaction>
  save(transactionsData: UserTransaction): Promise<UserTransaction>
}
