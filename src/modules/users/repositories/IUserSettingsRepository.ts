import UserSettings from '../infra/typeorm/entities/UserSettings'
import ICreateUserSettingsDTO from '@modules/users/dtos/ICreateUserSettingsDTO'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

interface IFindAllUser {
  data: UserSettings[]
  total: number
}

export default interface IUserSettingsRepository {
  create(userData: ICreateUserSettingsDTO): Promise<UserSettings>
  findById(id: string): Promise<UserSettings | undefined>
  findAndCount(optoins: IPaginationOptionsDTO): Promise<IFindAllUser>
  findByUser(userId: string): Promise<UserSettings | undefined>
  save(userSettings: UserSettings): Promise<UserSettings>
}
