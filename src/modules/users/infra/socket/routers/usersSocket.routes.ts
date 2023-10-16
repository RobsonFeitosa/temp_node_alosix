import { Router, Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { Server, Socket } from 'socket.io'
import authConfig from '@config/auth'
import { TokenPayload } from '../../http/middlewares/ensureAuthenticated'
import AppError from '@shared/errors/AppError'

const authenticateSocket = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.query.token

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

export default (io: Server) => {
  const router = Router()

  // Handle Socket.IO connections
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket)

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket)
    })
  })

  // Routes for testing authentication
  router.get('/public', (req: Request, res: Response): void => {
    res.send('Public route')
  })

  router.get('/private', authenticateSocket, (req: Request, res) => {
    res.send(`Private route for ${req.user.id}`)
  })

  return router
}
