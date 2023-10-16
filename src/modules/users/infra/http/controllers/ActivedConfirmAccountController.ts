import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ActivedConfirmAccountService from '@modules/users/services/ActivedConfirmAccountService'

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token } = req.body

    const activedConfirm = container.resolve(ActivedConfirmAccountService)

    await activedConfirm.execute({
      token,
      actived: true,
    })

    return res.status(204).json()
  }
}
