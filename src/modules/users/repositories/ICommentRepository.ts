import UserComments from '../infra/typeorm/entities/UserComments'
import ICreateCommentDTO from '../dtos/ICreateCommentDTO'
import { IFindAll } from '../infra/typeorm/repositories/CommentRepository'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

export default interface ICommentRepository {
  findById(id: string): Promise<UserComments | undefined>
  findByIdUser(id: string): Promise<UserComments | undefined>
  findAll(options: IPaginationOptionsDTO, userId: string): Promise<IFindAll>
  create(data: ICreateCommentDTO): Promise<UserComments>
  save(data: UserComments): Promise<UserComments>
  delete(id: string): Promise<void>
}
