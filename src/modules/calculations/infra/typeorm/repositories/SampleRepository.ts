import { getRepository, Repository, Brackets, Raw } from 'typeorm'

import ISampleRepository, {
  IMetaSample,
} from '@modules/calculations/repositories/ISampleRepository'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

import Samples from '../entities/Samples'

interface IFindAllOfUserSample extends IPaginationOptionsDTO {
  user_id: string
}

interface IFindAllSample {
  data: Samples[]
  total: number
}

interface IFindFilter extends IPaginationOptionsDTO {
  min: number
  max: number
  unity: string
}

class SampleRepository implements ISampleRepository {
  private ormRepository: Repository<Samples>

  constructor() {
    this.ormRepository = getRepository(Samples)
  }

  public async create(dataSamples: Samples[]): Promise<Samples[]> {
    const sample = this.ormRepository.create(dataSamples)

    await this.ormRepository.save(sample)

    return sample
  }

  public async findAndCount(
    options: IFindAllOfUserSample,
  ): Promise<IFindAllSample> {
    const builder = this.ormRepository.createQueryBuilder('samples')

    const total = await builder
      .where('samples.user_id = :user_id', {
        user_id: options.user_id,
      })
      .getCount()

    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .orderBy({
          'samples.created_at': 'DESC',
        })
        .take(options.limit)
        .where('samples.user_id = :user_id', {
          user_id: options.user_id,
        })
        .getMany()

      return { total, data }
    }
    const data = await builder.getMany()

    return { total, data }
  }

  public async findMeta(userId: string): Promise<IMetaSample> {
    const builder = this.ormRepository.createQueryBuilder('samples')

    const total = await builder
      .where('samples.user_id = :user_id', {
        user_id: userId,
      })
      .getCount()

    const data = await builder
      .orderBy({
        'samples.created_at': 'DESC',
      })
      .where('samples.user_id = :user_id', {
        user_id: userId,
      })
      .limit(1)
      .getMany()

    if (data.length === 0) {
      return { total: 0, lastSampleName: undefined }
    }

    return { total, lastSampleName: data[0].description_cuture }
  }

  public async findLimit(limit: string): Promise<Samples[]> {
    const builder = this.ormRepository.createQueryBuilder('samples')

    if (limit) {
      const data = await builder
        .orderBy({
          'samples.created_at': 'DESC',
        })
        .take(Number(limit))
        .getMany()

      return data
    }
    const data = await builder.getMany()

    return data
  }

  public async findAll(
    options: IPaginationOptionsDTO,
  ): Promise<IFindAllSample> {
    const builder = this.ormRepository.createQueryBuilder('samples')

    const total = await builder.getCount()

    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .orderBy({
          'samples.created_at': 'DESC',
        })
        .take(options.limit)
        .getMany()

      return { total, data }
    }
    const data = await builder.getMany()

    return { total, data }
  }

  public async findChart(): Promise<Samples[]> {
    const builder = this.ormRepository.createQueryBuilder('samples')

    const data = await builder
      .orderBy({
        'samples.created_at': 'DESC',
      })
      .getMany()

    return data
  }

  public async findCount(): Promise<number> {
    const builder = this.ormRepository.createQueryBuilder('samples')

    const total = await builder.getCount()

    return total
  }

  public async findById(id: string): Promise<Samples | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return result
  }

  public async findByIdSort(
    searchTermId: string,
  ): Promise<Samples | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        id: Raw((alias) => `${alias} ILIKE '%${searchTermId}%'`),
      },
    })
    return result
  }

  public async findPh(options: IFindFilter): Promise<IFindAllSample> {
    const builder = this.ormRepository.createQueryBuilder('samples')

    const total = await builder
      .where(
        new Brackets((qb) => {
          qb.where('samples.tb_2_ph >= :tbphMin', {
            tbphMin: `{"unity":${options.unity},"value":${options.min}}`,
          }).andWhere('samples.tb_2_ph <= :tbphMax', {
            tbphMax: `{"unity":${options.unity},"value":${options.max}}`,
          })
        }),
      )
      .getCount()

    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .addOrderBy('samples.created_at')
        .where(
          new Brackets((qb) => {
            qb.where('samples.tb_2_ph >= :tbphMin', {
              tbphMin: `{"unity":${options.unity},"value":${options.min}}`,
            }).andWhere('samples.tb_2_ph <= :tbphMax', {
              tbphMax: `{"unity":${options.unity},"value":${options.max}}`,
            })
          }),
        )
        .take(options.limit)
        .getMany()

      return { total, data }
    }

    const data = await builder.getMany()

    return { total, data }
  }

  public async delete(id: string): Promise<void> {
    const sample = await this.ormRepository.findOne(id)

    if (sample) {
      this.ormRepository.remove(sample)
    }
  }

  public async save(dataSamples: Samples[]): Promise<Samples[]> {
    return this.ormRepository.save(dataSamples)
  }
}

export default SampleRepository
