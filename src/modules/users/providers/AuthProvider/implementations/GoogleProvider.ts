import { injectable } from 'tsyringe'

import { google } from 'googleapis'

import IGoogleProvider from '../models/IGoogleProvider'
import { ILoginTicketDTO } from '../dto/ILoginTicket.dto'
import AppError from '@shared/errors/AppError'

@injectable()
export default class GoogleProvider implements IGoogleProvider {
  private readonly oauth2Client

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLOUD_ID_CLIENT,
      process.env.GOOGLE_CLOUD_KEY_CLIENT,
      process.env.GOOGLE_CLOUD_CALLBACK,
    )
  }

  public generateURL(scope: string[]): string {
    const authUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
    })

    return authUrl
  }

  public async authenticate(code: string): Promise<any> {
    const { tokens } = await this.oauth2Client.getToken(code)
    this.oauth2Client.setCredentials(tokens)

    return tokens
  }

  public async destroy(token: string): Promise<void> {
    await this.oauth2Client.revokeToken(token)
  }

  public async getInfo(
    idToken: string,
    clientId: string,
  ): Promise<ILoginTicketDTO> {
    const response = await this.oauth2Client
      .verifyIdToken({
        idToken,
        audience: clientId,
      })
      .catch((err) => {
        if (err) throw new AppError('Credential invalid')
      })

    if (!response) {
      throw new AppError('Confirm credential')
    }

    const payload = response.getPayload()

    if (!payload) {
      throw new AppError('Payload not foud')
    }

    return payload
  }
}
