import Collaborator from '../infra/typeorm/entities/Collaborator'

export type ICreateCollaboratorDTO = Omit<
  Collaborator,
  'id' | 'created_at' | 'updated_at'
>
