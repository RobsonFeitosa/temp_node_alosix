import { Request, Response } from 'express'

import { container } from 'tsyringe'

import CreateOrderService from '@modules/orders/services/CreateOrderService'
import FindOrderService from '@modules/orders/services/FindOrderService'
import UpdateOrderSampleIDService from '@modules/orders/services/UpdateOrderSampleIDService'
import { classToClass } from 'class-transformer'
import IndexOrderService from '@modules/orders/services/IndexOrderService'
import IndexOrderOfSampleService from '@modules/orders/services/IndexOrderOfSampleService'

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const findOrder = container.resolve(FindOrderService)

    const order = await findOrder.execute({
      id,
    })

    return response.json(order)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit } = request.query

    const indexOrder = container.resolve(IndexOrderService)

    const orders = await indexOrder.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(classToClass(orders))
  }

  public async indexOfSample(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params

    const indexOrderOfSample = container.resolve(IndexOrderOfSampleService)

    const orders = await indexOrderOfSample.execute(id)

    return response.json(classToClass(orders))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { calculateOptions } = request.body
    const userId = request.user.id

    const createOrder = container.resolve(CreateOrderService)

    const order = await createOrder.execute({
      userId,
      calculateOptions,
    })

    return response.json(order)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const { orderId } = request.params

    const updateOrder = container.resolve(UpdateOrderSampleIDService)

    const order = await updateOrder.execute({
      orderId,
      data,
    })

    return response.json(classToClass(order))
  }
}
