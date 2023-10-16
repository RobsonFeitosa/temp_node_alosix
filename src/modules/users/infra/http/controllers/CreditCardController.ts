import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateCreditCardService from '@modules/users/services/CreateCreditCardService'
import IndexCreditCardService from '@modules/users/services/IndexCreditCardService'
import ShowCreditCardService from '@modules/users/services/ShowCreditCardService'
import DeleteCreditCardService from '@modules/users/services/DeleteCreditCardService'
import ActivedCreditCardUserService from '@modules/users/services/ActivedCreditCardUserService'
import ShowActivedCreditCardUserService from '@modules/users/services/ShowActivedCreditCardUserService'

export default class Controller {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id

    const createCreditCard = container.resolve(CreateCreditCardService)

    const card = await createCreditCard.execute({
      creditCard: { ...req.body, user_id },
    })

    return res.json(card)
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit } = req.query
    const user_id = req.user.id

    const indexCreditCard = container.resolve(IndexCreditCardService)

    const card = await indexCreditCard.execute(
      {
        page: Number(page),
        limit: Number(limit),
      },
      user_id,
    )

    return res.json(card)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { cardId } = req.params

    const showCard = container.resolve(ShowCreditCardService)

    const card = await showCard.execute(cardId)

    return res.json(card)
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { cardId } = req.params

    const deleteCard = container.resolve(DeleteCreditCardService)

    await deleteCard.execute(cardId)

    return res.status(204).send()
  }

  public async updateActived(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const activedCard = container.resolve(ActivedCreditCardUserService)

    const { cardId } = request.params

    const transaction = await activedCard.execute(cardId)

    return response.json(transaction)
  }

  public async showActived(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const activedCard = container.resolve(ShowActivedCreditCardUserService)
    const userId = request.user.id

    const transaction = await activedCard.execute({
      userId,
    })

    return response.json(transaction)
  }
}
