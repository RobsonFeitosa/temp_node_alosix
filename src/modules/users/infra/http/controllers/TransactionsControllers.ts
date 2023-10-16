import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateTransactionService from '@modules/users/services/CreateTransactionService'
import IndexTransactionService from '@modules/users/services/IndexTransactionService'
import IndexCountTransactionsService from '@modules/users/services/IndexCountTransactionsService'
import UpdateStatusUserTransactionsService from '@modules/users/services/UpdateStatusUserTransactionsService'
import CreatePixTransactionService from '@modules/users/services/CreatePixTransitionService'
import ShowTransactionService from '@modules/users/services/ShowTransactionService'
import { classToClass } from 'class-transformer'

export default class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id

    const crateTransaction = container.resolve(CreateTransactionService)
    const transaction = await crateTransaction.execute({
      user_id: userId,
      transaction: req.body,
    })

    return res.json(transaction)
  }

  public async createPix(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id

    const createTransaction = container.resolve(CreatePixTransactionService)
    const transaction = await createTransaction.execute({
      user_id: userId,
      data: req.body,
    })

    return res.json(transaction)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit } = request.query

    const indexTransactions = container.resolve(IndexTransactionService)

    const transaction = await indexTransactions.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(classToClass(transaction))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { idTransaction } = request.params

    const showTransactions = container.resolve(ShowTransactionService)

    const transaction = await showTransactions.execute(idTransaction)

    return response.json(transaction)
  }

  public async indexCount(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const indexTransactions = container.resolve(IndexCountTransactionsService)

    const transaction = await indexTransactions.execute(request.user.id)

    return response.json(transaction)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { idTransaction } = request.params
    const { status } = request.body

    const updateTransactions = container.resolve(
      UpdateStatusUserTransactionsService,
    )

    const transaction = await updateTransactions.execute({
      status,
      idTransaction,
    })

    return response.json(transaction)
  }
}
