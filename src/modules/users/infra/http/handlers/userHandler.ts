import { Server, Socket } from 'socket.io'

export default class UserHandler {
  private io: Server
  private socket: Socket

  constructor(io: Server, socket: Socket) {
    this.io = io
    this.socket = socket
  }

  public userCreatePixHandle() {
    console.log({ userId: this.socket.user.id })
    const createPixOrder = (data: string) => {
      console.log('A user connected')

      console.log('Received message:', data)

      this.io.emit('user:create-pix-order', { data, other: 22 })
    }

    this.socket.on('user:create-pix-order', createPixOrder)
  }
}
