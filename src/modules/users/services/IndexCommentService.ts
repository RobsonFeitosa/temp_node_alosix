import { injectable, inject } from 'tsyringe'

import UserComments from '../infra/typeorm/entities/UserComments'

import ICommentRepository from '../repositories/ICommentRepository'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import { IFindAll } from '../infra/typeorm/repositories/CommentRepository'

@injectable()
class IndexCommentService {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
    userId: string,
  ): Promise<IFindAll> {
    const result = await this.commentRepository.findAll(options, userId)

    return result
  }
}

export default IndexCommentService
