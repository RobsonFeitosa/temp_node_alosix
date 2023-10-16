import { inject, injectable } from 'tsyringe'
import { uuid } from 'uuidv4'

import AppError from '@shared/errors/AppError'

import Order from '../infra/typeorm/entities/Order'
import ISampleRepository from '@modules/calculations/repositories/ISampleRepository'
import IOrdersRepository from '../repositories/IOrdersRepository'
import { IOPTCalculations } from '../dtos/ICreateOrderDTO'

interface IRequest {
  userId: string
  calculateOptions: IOPTCalculations
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ userId, calculateOptions }: IRequest): Promise<Order> {
    const idCod = uuid()

    const order = await this.ordersRepository.create({
      cod_order: idCod.substring(1, 11),
      user_id: userId,
      calculate_options: calculateOptions,
    })

    return order
  }
}

export default CreateOrderService
