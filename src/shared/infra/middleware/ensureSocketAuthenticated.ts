import { verify } from 'jsonwebtoken'
import { Socket } from 'socket.io'

import authConfig from '@config/auth'
import { TokenPayload } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppError from '@shared/errors/AppError'

export default (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token

  if (!token) {
    return next(new Error('Authentication error: Token missing'))
  }

  try {
    const decoded = verify(String(token), authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    socket.user = {
      id: sub,
    }

    return next()
  } catch (err) {
    throw new AppError('Invalid JWT token', 401)
  }
}
