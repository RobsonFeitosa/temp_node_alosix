import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import AuthenticationUserService from '@modules/users/services/AuthenticateUserService'
import AuthenticateGoogleService from '@modules/users/services/AuthenticateGoogleService'

export default class SessionsControler {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticateUser = container.resolve(AuthenticationUserService)

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    return res.json({ user: classToClass(user), token })
  }

  public async createGoogle(req: Request, res: Response): Promise<Response> {
    const { credential, clientId } = req.body

    const authenticateUser = container.resolve(AuthenticateGoogleService)

    const { user, token } = await authenticateUser.execute({
      credential,
      clientId,
    })

    return res.json({ user: classToClass(user), token })
  }
}
