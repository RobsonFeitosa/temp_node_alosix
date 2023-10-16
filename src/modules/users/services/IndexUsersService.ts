import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'

import User from '../infra/typeorm/entities/User'

interface IPromiseUser {
  total: number
  data: User[]
}

@injectable()
class IndexUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(options: IPaginationOptionsDTO): Promise<IPromiseUser> {
    const users = await this.usersRepository.findAndCount(options)
    console.log('### Testeeeeeeee pipes mas ne q funciona ????')

    return users
  }
}

export default IndexUsersService
