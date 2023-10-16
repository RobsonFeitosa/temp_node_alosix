import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'

@injectable()
class IndexUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<number> {
    const count = await this.usersRepository.findCount()

    return count
  }
}

export default IndexUsersService
