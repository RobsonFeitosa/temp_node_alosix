import { injectable, inject } from 'tsyringe'

import UserComments from '../infra/typeorm/entities/UserComments'

import ICreateCommentDTO from '../dtos/ICreateCommentDTO'
import ICommentRepository from '../repositories/ICommentRepository'

@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  public async execute(
    data: ICreateCommentDTO,
    userId: string,
  ): Promise<UserComments> {
    const result = await this.commentRepository.create({ ...data, userId })

    return result
  }
}

export default CreateCommentService
