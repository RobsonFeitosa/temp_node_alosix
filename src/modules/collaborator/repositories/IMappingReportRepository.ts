import { ICreateMappingReportDTO } from '../dtos/ICreateMappingReportDTO'
import MappingReport from '../infra/typeorm/entities/MappingReport'

export default interface IMappingReportRepository {
  create(data: ICreateMappingReportDTO): Promise<MappingReport>
  findById(id: string): Promise<MappingReport | undefined>
  delete(id: string): Promise<void>
  save(data: MappingReport): Promise<MappingReport>
}
