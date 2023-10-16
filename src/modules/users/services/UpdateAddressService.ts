import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IAddressRepository from '../repositories/IAddressRepository'

import Address from '../infra/typeorm/entities/Address'

interface IRequest {
  addressId: string
  zipcode: string
  city: string
  state: string
  country: string
  neighborhood: string
  street: string
  streetNumber: string
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    addressId,
    zipcode,
    city,
    state,
    country,
    neighborhood,
    street,
    streetNumber,
  }: IRequest): Promise<Address> {
    const address = await this.addressRepository.findById(addressId)

    if (!address) throw new AppError('Address not found')

    address.zipcode = zipcode
    address.city = city
    address.state = state
    address.country = country
    address.neighborhood = neighborhood
    address.street = street
    address.street_number = streetNumber

    return this.addressRepository.save(address)
  }
}

export default UpdateAddressService
