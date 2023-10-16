import { inject, injectable } from 'tsyringe'

import pagarme from 'pagarme'
import IUsersRepository from '../repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class IndexTransactionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<number> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) throw new AppError('User not found')

    const apikeyAdmSandbox =
      user.settings.level === 1
        ? 'ak_test_MSybjlAoZ25e3BgB5JBFGbGHBe4BBX'
        : process.env.PAGARME_API_KEY

    const client = await pagarme.client.connect({
      api_key: apikeyAdmSandbox,
    })

    const transf = await client.transactions.all({ count: 100000 })

    return transf.length
  }
}

export default IndexTransactionService
