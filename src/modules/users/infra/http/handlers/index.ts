import { Server, Socket } from 'socket.io'
import UserHandler from './userHandler'

export const userConnection = (io: Server, socket: Socket) => {
  new UserHandler(io, socket).userCreatePixHandle()
}
