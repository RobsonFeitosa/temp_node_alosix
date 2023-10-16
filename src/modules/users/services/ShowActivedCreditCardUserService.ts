import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ICreditCardRepository from '../repositories/ICreditCardRepository'
import ICreateCreditCardDTO from '@modules/dtos/ICreateCreditCardDTO'

interface IRequest {
  userId: string
}

@injectable()
class ShowActivedCreditCardUserService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<ICreateCreditCardDTO> {
    const creditCard = await this.creditCardRepository.findActived(userId)

    if (!creditCard) throw new AppError('card credit does not exists', 404)

    return creditCard
  }
}

export default ShowActivedCreditCardUserService
