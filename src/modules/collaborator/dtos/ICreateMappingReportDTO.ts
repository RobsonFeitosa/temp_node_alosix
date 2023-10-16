import MappingReport from '../infra/typeorm/entities/MappingReport'

export type ICreateMappingReportDTO = Omit<
  MappingReport,
  'id' | 'created_at' | 'updated_at'
>
