import { injectable, inject } from 'tsyringe'

import IAddressRepository from '../repositories/IAddressRepository'
import Address from '../infra/typeorm/entities/Address'

import ICreateAddressDTO from '../dtos/ICreateAddressDTO'

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    user_id,
    zipcode,
    city,
    state,
    country,
    neighborhood,
    street,
    street_number,
  }: ICreateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.create({
      user_id,
      zipcode,
      city,
      state,
      country,
      neighborhood,
      street,
      street_number,
    })

    return address
  }
}

export default CreateAddressService
