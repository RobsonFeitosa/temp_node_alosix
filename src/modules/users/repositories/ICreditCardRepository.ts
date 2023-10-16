import CreditCard from '../infra/typeorm/entities/CreditCard'

import ICreateCreditCardDTO from '../../dtos/ICreateCreditCardDTO'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'

interface IFindAllCreditCard {
  data: CreditCard[]
  total: number
}

export default interface ICreditCardRepository {
  create(creditData: ICreateCreditCardDTO): Promise<CreditCard>
  findById(cardId: string): Promise<CreditCard | undefined>
  findByCardId(cardId: string): Promise<CreditCard | undefined>
  findByUserId(userId: string): Promise<CreditCard | undefined>
  findActived(userId: string): Promise<CreditCard | undefined>
  findByNumber(number: string): Promise<CreditCard | undefined>
  Index(
    options: IPaginationOptionsDTO,
    userId: string,
  ): Promise<IFindAllCreditCard>
  delete(cardId: string): Promise<void>
  delete(cardId: string): Promise<void>
  save(creditData: CreditCard): Promise<CreditCard>
}
