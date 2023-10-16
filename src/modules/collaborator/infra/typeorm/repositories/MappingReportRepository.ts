import { getRepository, Repository } from 'typeorm'

import IMappingReportRepository from '@modules/collaborator/repositories/IMappingReportRepository'
import MappingReport from '../entities/MappingReport'
import { ICreateMappingReportDTO } from '@modules/collaborator/dtos/ICreateMappingReportDTO'

class MappingReportRepository implements IMappingReportRepository {
  private ormRepository: Repository<MappingReport>

  constructor() {
    this.ormRepository = getRepository(MappingReport)
  }

  public async create(data: ICreateMappingReportDTO): Promise<MappingReport> {
    const mapping = this.ormRepository.create(data)

    await this.ormRepository.save(mapping)

    return mapping
  }

  public async findById(id: string): Promise<MappingReport | undefined> {
    const result = await this.ormRepository.findOne(id)

    return result
  }

  public async delete(id: string): Promise<void> {
    const mappingReport = await this.ormRepository.findOne(id)

    if (mappingReport) {
      this.ormRepository.remove(mappingReport)
    }
  }

  public async save(dataSamples: MappingReport): Promise<MappingReport> {
    return this.ormRepository.save(dataSamples)
  }
}

export default MappingReportRepository
