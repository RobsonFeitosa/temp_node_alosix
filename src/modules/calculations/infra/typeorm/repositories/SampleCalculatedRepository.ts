import { getRepository, Repository } from 'typeorm'

import ISampleCalculatedRepository from '@modules/calculations/repositories/ISampleCalculatedRepository'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

import SampleCalculated from '../entities/SampleCalculated'

interface IFindAllOfUserSample extends IPaginationOptionsDTO {
  user_id: string
}

interface IFindAllSample {
  data: SampleCalculated[]
  total: number
}

type ISavedSamples = Omit<SampleCalculated, 'id' | 'user'>

class SampleCalculatedRepository implements ISampleCalculatedRepository {
  private ormRepository: Repository<SampleCalculated>

  constructor() {
    this.ormRepository = getRepository(SampleCalculated)
  }

  public async create(
    dataSamples: ISavedSamples[],
  ): Promise<SampleCalculated[]> {
    const sample = this.ormRepository.create(dataSamples)

    await this.ormRepository.save(sample)

    return sample
  }

  public async findAndCount(
    options: IFindAllOfUserSample,
  ): Promise<IFindAllSample> {
    const builder = this.ormRepository.createQueryBuilder('samples_calculated')

    const total = await builder
      .where('samples_calculated.user_id = :user_id', {
        user_id: options.user_id,
      })
      .getCount()

    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .orderBy({
          'samples_calculated.created_at': 'DESC',
        })
        .take(options.limit)
        .where('samples_calculated.user_id = :user_id', {
          user_id: options.user_id,
        })
        .getMany()

      return { total, data }
    }
    const data = await builder.getMany()

    return { total, data }
  }

  public async findById(id: string): Promise<SampleCalculated | undefined> {
    const result = await this.ormRepository.findOne(id)

    return result
  }

  public async findBySampleId(
    sampleId: string,
  ): Promise<SampleCalculated | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        sample_id: sampleId,
      },
    })

    return result
  }

  public async save(dataSamples: SampleCalculated): Promise<SampleCalculated> {
    return this.ormRepository.save(dataSamples)
  }
}

export default SampleCalculatedRepository
