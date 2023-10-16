import { getRepository, Repository } from 'typeorm'

import ICommentRepository from '@modules/users/repositories/ICommentRepository'
import ICreateCommentDTO from '@modules/users/dtos/ICreateCommentDTO'

import UserComments from '../entities/UserComments'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

export interface IFindAll {
  total: number
  data: UserComments[]
}

class CommentRepository implements ICommentRepository {
  private ormRepository: Repository<UserComments>

  constructor() {
    this.ormRepository = getRepository(UserComments)
  }

  public async findById(id: string): Promise<UserComments | undefined> {
    const result = await this.ormRepository.findOne(id)

    return result
  }

  public async findByIdUser(id: string): Promise<UserComments | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        user_id: id,
      },
    })

    return result
  }

  public async findAll(
    options: IPaginationOptionsDTO,
    userId?: string,
  ): Promise<IFindAll> {
    const builder = this.ormRepository.createQueryBuilder('comments')

    const total = await builder.getCount()

    const page = options.page || 1
    const limit = options.limit || 1000
    const data = builder
      .skip((page - 1) * limit)
      .addOrderBy('comments.created_at', 'DESC')
      .take(options.limit)

    if (userId) {
      data.where('comments.user_id = :userId', { userId })
    }

    return { total, data: await data.getMany() }
  }

  public async create(data: ICreateCommentDTO): Promise<UserComments> {
    const result = this.ormRepository.create({
      ...data,
      is_public: data.isPublic,
      user_id: data.userId,
    })

    await this.ormRepository.save(result)

    return result
  }

  public async save(address: UserComments): Promise<UserComments> {
    return this.ormRepository.save(address)
  }

  public async delete(id: string): Promise<void> {
    const result = await this.ormRepository.findOne(id)

    if (result) {
      this.ormRepository.remove(result)
    }
  }
}

export default CommentRepository
