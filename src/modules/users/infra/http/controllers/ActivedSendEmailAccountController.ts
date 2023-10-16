import { Request, Response } from 'express'
import { container } from 'tsyringe'

import SendActivedUserEmailService from '@modules/users/services/SendActivedUserEmailService'

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    const sendActiveEmail = container.resolve(SendActivedUserEmailService)

    await sendActiveEmail.execute({
      email,
    })

    return res.status(204).json()
  }
}
