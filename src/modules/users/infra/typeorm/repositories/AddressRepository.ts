import { getRepository, Repository } from 'typeorm'

import IAddressRepository from '@modules/users/repositories/IAddressRepository'
import ICreateAddressDTO from '@modules/users/dtos/ICreateAddressDTO'

import Address from '../entities/Address'

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>

  constructor() {
    this.ormRepository = getRepository(Address)
  }

  public async findById(addressId: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(addressId)

    return address
  }

  public async findByIdUser(userId: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: {
        user_id: userId,
      },
    })

    return address
  }

  public async findByEmail(email: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { email },
    })

    return address
  }

  public async create(addressData: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(addressData)

    await this.ormRepository.save(address)

    return address
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address)
  }
}

export default AddressRepository
