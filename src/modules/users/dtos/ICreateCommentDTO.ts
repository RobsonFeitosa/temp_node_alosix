import { CommentTypeEnum } from '../enum/CommentTypeEnum'
import UserComments from '../infra/typeorm/entities/UserComments'

export default interface ICreateCommentDTO
  extends Omit<
    UserComments,
    | 'id'
    | 'type'
    | 'is_public'
    | 'user_id'
    | 'user'
    | 'created_at'
    | 'updated_at'
  > {
  isPublic: string
  userId: string
  type: CommentTypeEnum
}
