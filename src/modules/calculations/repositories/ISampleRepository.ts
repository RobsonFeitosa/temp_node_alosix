import Samples from '../infra/typeorm/entities/Samples'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'

interface IFindAllSample {
  data: Samples[]
  total: number
}
export interface IMetaSample {
  total: number
  lastSampleName: string | undefined
}

interface IFindFilter extends IPaginationOptionsDTO {
  min: number
  max: number
  unity: string
}

interface IFindAllOfUserSample extends IPaginationOptionsDTO {
  user_id: string
}

type ISavedSamples = Omit<
  Samples,
  'deleted_at' | 'id' | 'created_at' | 'updated_at' | 'user' | 'fertilizing'
>

export default interface ISampleRepository {
  create(dataSamples: ISavedSamples[]): Promise<Samples[]>
  findAndCount(options: IFindAllOfUserSample): Promise<IFindAllSample>
  findChart(): Promise<Samples[]>
  findCount(): Promise<number>
  findLimit(limit: string): Promise<Samples[]>
  findMeta(userId: string): Promise<IMetaSample>
  findById(id: string): Promise<Samples | undefined>
  findByIdSort(searchTermId: string): Promise<Samples | undefined>
  findPh(options: IFindFilter): Promise<IFindAllSample>
  findAll(options: IPaginationOptionsDTO): Promise<IFindAllSample>
  delete(id: string): Promise<void>
  save(dataSamples: Samples[]): Promise<Samples[]>
}
