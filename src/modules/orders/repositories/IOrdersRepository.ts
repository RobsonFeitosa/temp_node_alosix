import Order from '../infra/typeorm/entities/Order'

import ICreateOrderDTO from '../dtos/ICreateOrderDTO'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

interface IFindAllOrder {
  data: Order[]
  total: number
}

export default interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>
  findAndCount(optoins: IPaginationOptionsDTO): Promise<IFindAllOrder>
  findOrderOfSample(id: string): Promise<Order[]>
  findById(id: string): Promise<Order | undefined>
  save(order: Order): Promise<Order>
}
