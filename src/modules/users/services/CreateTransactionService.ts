import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import pagarme from 'pagarme'
import IUsersRepository from '../repositories/IUsersRepository'
import UserTransactions from '../infra/typeorm/entities/UserTransactions'
import ICreditCardRepository from '../repositories/ICreditCardRepository'
import { ICreateTransactionDTO } from '../../dtos/ITransactionsDTO'
import IUserTransactionsRepository from '../repositories/IUserTransactionsRepository'

interface IRequest {
  transaction: ICreateTransactionDTO
  user_id: string
}

interface IPromise {
  transaction: UserTransactions
  user_id: string
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,

    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,
  ) {}

  public async execute({ user_id, transaction }: IRequest): Promise<IPromise> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) throw new AppError('User not found')

    const { card_hash, card_id } = transaction

    let card
    if (card_id) {
      card = await this.creditCardRepository.findByCardId(card_id)

      if (!card) throw new AppError('Card not found')
    }

    const apikeyAdmSandbox =
      user.settings.level === 1
        ? 'ak_test_MSybjlAoZ25e3BgB5JBFGbGHBe4BBX'
        : process.env.PAGARME_API_KEY

    const client = await pagarme.client.connect({
      api_key: apikeyAdmSandbox,
    })

    const { order_id, ...transactionPayload } = transaction

    const pagarmeTransaction = await client.transactions.create({
      ...transactionPayload,
      ...(card_hash ? { card_hash } : { card_id: card?.card_id }),
    })

    const userTransaction = await this.userTransactionsRepository.create({
      user_id,
      amount: transaction.amount,
      brand: pagarmeTransaction.card_brand,
      order_id,
      payment_method: 'credit-card',
      status: pagarmeTransaction.status,
      tid: pagarmeTransaction.id,
    })

    return { transaction: userTransaction, user_id: user.id }
  }
}

export default CreateTransactionService
