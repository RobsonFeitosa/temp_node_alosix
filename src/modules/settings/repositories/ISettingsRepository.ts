import Settings from '../infra/typeorm/entities/Settings'
import ICreateSettingsDTO from '../dtos/ICreateSettingsDTO'

export default interface ISettingsResitory {
  create(dataSettings: ICreateSettingsDTO): Promise<Settings>
  findById(settingId: string): Promise<Settings | undefined>
  findByLocation(location: string): Promise<Settings | undefined>
  save(dataSettings: Settings): Promise<Settings>
}
