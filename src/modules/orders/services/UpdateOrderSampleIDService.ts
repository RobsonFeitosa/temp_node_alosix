import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Order from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../repositories/IOrdersRepository'

interface IOrder {
  sampleId: string
}

interface IRequest {
  orderId: string
  data: IOrder
}

@injectable()
class UpdateOrderSampleIDService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ orderId, data }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new AppError('Order not found')
    }

    const { sampleId } = data

    order.sample_id = sampleId

    await this.ordersRepository.save(order)

    return order
  }
}

export default UpdateOrderSampleIDService
