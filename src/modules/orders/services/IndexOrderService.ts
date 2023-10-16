import { inject, injectable } from 'tsyringe'

import Order from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../repositories/IOrdersRepository'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

interface IPromiseOrder {
  total: number
  data: Order[]
}

@injectable()
class IndexOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(options: IPaginationOptionsDTO): Promise<IPromiseOrder> {
    const orders = await this.ordersRepository.findAndCount(options)

    return orders
  }
}

export default IndexOrderService
