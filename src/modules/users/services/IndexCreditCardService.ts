import { injectable, inject } from 'tsyringe'

import ICreditCardRepository from '../repositories/ICreditCardRepository'

import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'

import ICreateCreditCardDTO from '../../dtos/ICreateCreditCardDTO'
import IUsersRepository from '../repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'

interface IPromiseCards {
  total: number
  data: ICreateCreditCardDTO[]
}

@injectable()
class IndexCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
    userId: string,
  ): Promise<IPromiseCards> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('User not found')

    const cards = await this.creditCardRepository.Index(options, userId)

    return cards
  }
}

export default IndexCardService
