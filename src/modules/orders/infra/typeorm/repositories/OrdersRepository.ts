import { getRepository, Repository } from 'typeorm'

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository'
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO'
import Order from '../entities/Order'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

interface IFindAllOrder {
  data: Order[]
  total: number
}

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>

  constructor() {
    this.ormRepository = getRepository(Order)
  }

  public async create(data: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(data)

    await this.ormRepository.save(order)

    return order
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<IFindAllOrder> {
    const builder = this.ormRepository.createQueryBuilder('orders')

    const total = await builder.getCount()
    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .leftJoinAndSelect('orders.transactions', 'user_transactions')
        .addOrderBy('user_transactions.created_at')
        .take(options.limit)
        .getMany()

      return { total, data }
    }
    const data = await builder.getMany()

    return { total, data }
  }

  public async findOrderOfSample(id: string): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      where: {
        sample_id: id,
      },
      relations: ['transactions'],
    })

    return orders
  }

  public async save(order: Order): Promise<Order> {
    await this.ormRepository.save(order)
    return order
  }

  public async findById(id: string): Promise<Order | undefined> {
    const findOrder = await this.ormRepository.findOne(id)

    return findOrder
  }
}

export default OrdersRepository
