import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ICreditCardRepository from '../repositories/ICreditCardRepository'
import ICreateCreditCardDTO from '@modules/dtos/ICreateCreditCardDTO'

@injectable()
class ActivedCreditCardUserService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,
  ) {}

  public async execute(id: string): Promise<ICreateCreditCardDTO[]> {
    const creditCard = await this.creditCardRepository.findById(id)

    if (!creditCard) throw new AppError('card credit does not exists', 404)

    const cards = await this.setSaveAndActivedCard(id)

    return cards
  }

  private async setSaveAndActivedCard(
    id: string,
  ): Promise<ICreateCreditCardDTO[]> {
    const cards = await this.creditCardRepository.Index({ page: 0, limit: 0 })

    cards.data.forEach(async (card) => {
      if (card.id) {
        const newCard = {
          ...card,
          actived: id === card.id,
        }

        await this.creditCardRepository.save(newCard)
      }
    })

    return cards.data
  }
}

export default ActivedCreditCardUserService
