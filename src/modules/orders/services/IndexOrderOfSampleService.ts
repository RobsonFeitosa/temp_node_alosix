import { inject, injectable } from 'tsyringe'

import Order from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../repositories/IOrdersRepository'

@injectable()
class IndexOrderOfSampleService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<Order[]> {
    const orders = await this.ordersRepository.findOrderOfSample(id)

    orders.forEach((order) => {
      order.calculate_options = JSON.parse(order.calculate_options)
    })

    return orders
  }
}

export default IndexOrderOfSampleService
