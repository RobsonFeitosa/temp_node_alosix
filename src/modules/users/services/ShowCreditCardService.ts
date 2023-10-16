import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICreditCardRepository from '../repositories/ICreditCardRepository'

import ICreateCreditCardDTO from '../../dtos/ICreateCreditCardDTO'

@injectable()
class ShowCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,
  ) {}

  public async execute(cardId: string): Promise<ICreateCreditCardDTO> {
    const card = await this.creditCardRepository.findById(cardId)

    if (!card) throw new AppError('Card not found')

    return card
  }
}

export default ShowCreditCardService
