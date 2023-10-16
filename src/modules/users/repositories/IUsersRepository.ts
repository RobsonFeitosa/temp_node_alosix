import User from '../infra/typeorm/entities/User'

import ICreateUserDTO from '../dtos/ICreateUserDTO'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'

interface IFindAllUser {
  data: User[]
  total: number
}

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  findAndCount(optoins: IPaginationOptionsDTO): Promise<IFindAllUser>
  findUserForName(name: string): Promise<User | undefined>
  findCount(): Promise<number>
  create(userData: ICreateUserDTO): Promise<User>
  createTemp(userData: ICreateUserDTO[]): Promise<User[]>
  delete(id: string): Promise<void>
  save(user: User): Promise<User>
}
