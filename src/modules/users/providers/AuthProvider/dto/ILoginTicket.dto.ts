export interface ILoginTicketDTO {
  jti: string | undefined
  iss: string | undefined
  azp?: string | undefined
  aud: string | undefined
  sub: string | undefined
  email?: string | undefined
  email_verified?: boolean | undefined
  at_hash?: string | undefined
  name?: string | undefined
  picture?: string | undefined
  given_name?: string | undefined
  family_name?: string | undefined
  locale?: string | undefined
  iat: number | undefined
  exp: number | undefined
}
