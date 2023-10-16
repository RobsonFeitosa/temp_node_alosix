import { getRepository, Repository } from 'typeorm'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '../entities/User'

interface IFindAllUser {
  data: User[]
  total: number
}

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async createTemp(userData: ICreateUserDTO[]): Promise<User[]> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const builder = this.ormRepository.createQueryBuilder('users')
    const data = await builder
      .leftJoinAndSelect('users.settings', 'users_settings')
      .where('users.id = :id', { id })
      .getOne()
    return data
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<IFindAllUser> {
    // const user = await this.ormRepository.find({
    //   relations: {
    //     settings: true,
    //   }
    // });

    const builder = this.ormRepository.createQueryBuilder('users')

    const total = await builder.getCount()
    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .leftJoinAndSelect('users.settings', 'users_settings')
        .addOrderBy('users_settings.created_at')
        .take(options.limit)
        .getMany()

      return { total, data }
    }
    const data = await builder.getMany()

    return { total, data }
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    })

    return user
  }

  public async findUserForName(name: string): Promise<User | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        name,
      },
    })

    return result
  }

  public async delete(id: string): Promise<void> {
    const user = await this.ormRepository.findOne(id)

    if (user) {
      this.ormRepository.remove(user)
    }
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
