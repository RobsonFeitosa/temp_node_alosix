import { injectable, inject } from 'tsyringe'

import UserComments from '../infra/typeorm/entities/UserComments'

import ICommentRepository from '../repositories/ICommentRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class ShowCommentService {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  public async execute(commentId: string): Promise<UserComments> {
    const result = await this.commentRepository.findById(commentId)

    if (!result) throw new AppError('Comment not found', 404)

    return result
  }
}

export default ShowCommentService
