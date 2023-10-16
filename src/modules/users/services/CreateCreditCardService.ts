import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICreditCardRepository from '../repositories/ICreditCardRepository'
import IUsersRepository from '../repositories/IUsersRepository'

import ICreateCreditCardDTO from '../../dtos/ICreateCreditCardDTO'

interface IRequest {
  creditCard: ICreateCreditCardDTO
}

@injectable()
class CreateCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    creditCard,
  }: IRequest): Promise<ICreateCreditCardDTO> {
    const { user_id, number } = creditCard

    const user = await this.usersRepository.findById(user_id)

    if (!user) throw new AppError('User not found')

    const cardsAll = await this.creditCardRepository.Index({
      page: 0,
      limit: 0,
    })

    cardsAll.data.forEach(async (card) => {
      if (card.id) {
        await this.creditCardRepository.save({
          ...card,
          actived: false,
        })
      }
    })

    const cardCheckExist = await this.creditCardRepository.findByNumber(number)

    if (cardCheckExist) throw new AppError('Card already exist', 400)

    const card = await this.creditCardRepository.create({
      ...creditCard,
      actived: true,
    })

    return card
  }
}

export default CreateCreditCardService
