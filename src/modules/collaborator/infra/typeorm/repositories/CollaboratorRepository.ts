import { getRepository, Repository } from 'typeorm'

import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository'
import Collaborator from '../entities/Collaborator'
import { ICreateCollaboratorDTO } from '@modules/collaborator/dtos/ICreateCollaboratorDTO'

class CollaboratorRepository implements ICollaboratorRepository {
  private ormRepository: Repository<Collaborator>

  constructor() {
    this.ormRepository = getRepository(Collaborator)
  }

  public async create(data: ICreateCollaboratorDTO): Promise<Collaborator> {
    const collaborator = this.ormRepository.create(data)

    await this.ormRepository.save(collaborator)

    return collaborator
  }

  public async findById(id: string): Promise<Collaborator | undefined> {
    const result = await this.ormRepository.findOne(id)

    return result
  }

  public async findAll(): Promise<[Collaborator[], number]> {
    const result = await this.ormRepository.findAndCount()

    return result
  }

  public async findByName(name: string): Promise<Collaborator | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        name,
      },
    })

    return result
  }

  public async findByKeyReport(key: string): Promise<Collaborator | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        type: key,
      },
    })

    return result
  }

  public async delete(id: string): Promise<void> {
    const collaborator = await this.ormRepository.findOne(id)

    if (collaborator) {
      this.ormRepository.remove(collaborator)
    }
  }

  public async save(dataSamples: Collaborator): Promise<Collaborator> {
    return this.ormRepository.save(dataSamples)
  }
}

export default CollaboratorRepository
