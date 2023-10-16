import SampleCalculated from '../infra/typeorm/entities/SampleCalculated'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'

interface IFindAllSample {
  data: SampleCalculated[]
  total: number
}

interface IFindAllOfUserSample extends IPaginationOptionsDTO {
  user_id: string
}

type ISavedSamples = Omit<SampleCalculated, 'id' | 'user'>

export default interface ISampleRepository {
  create(dataSamples: ISavedSamples[]): Promise<SampleCalculated[]>
  findAndCount(options: IFindAllOfUserSample): Promise<IFindAllSample>
  findById(id: string): Promise<SampleCalculated | undefined>
  findBySampleId(sampleId: string): Promise<SampleCalculated | undefined>
  save(dataSamples: SampleCalculated): Promise<SampleCalculated>
}
