import { ICreateCollaboratorDTO } from '../dtos/ICreateCollaboratorDTO'
import Collaborator from '../infra/typeorm/entities/Collaborator'

export default interface ICollaboratorRepository {
  create(data: ICreateCollaboratorDTO): Promise<Collaborator>
  findById(id: string): Promise<Collaborator | undefined>
  findByName(name: string): Promise<Collaborator | undefined>
  findAll(): Promise<[Collaborator[], number]>
  findByKeyReport(key: string): Promise<Collaborator | undefined>
  delete(id: string): Promise<void>
  save(data: Collaborator): Promise<Collaborator>
}
