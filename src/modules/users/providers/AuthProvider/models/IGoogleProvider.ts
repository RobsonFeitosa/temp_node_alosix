import { ILoginTicketDTO } from '../dto/ILoginTicket.dto'

export default interface IGoogleProvider {
  generateURL: (scopes: string[]) => string
  authenticate: (code: string) => Promise<any>
  destroy: (token: string) => Promise<void>
  getInfo: (idToken: string, clientId: string) => Promise<ILoginTicketDTO>
}
