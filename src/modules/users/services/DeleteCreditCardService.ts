import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICreditCardRepository from '../repositories/ICreditCardRepository'
import IUsersRepository from '../repositories/IUsersRepository'

@injectable()
class DeleteCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(cardId: string): Promise<void> {
    const card = await this.creditCardRepository.findById(cardId)

    if (!card) throw new AppError('Card not exist')

    await this.creditCardRepository.delete(cardId)
  }
}

export default DeleteCreditCardService
