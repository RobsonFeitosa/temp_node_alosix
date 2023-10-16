import Address from '../infra/typeorm/entities/Address'
import ICreateAddressDTO from '../dtos/ICreateAddressDTO'

export default interface IAddressRepository {
  findById(addressId: string): Promise<Address | undefined>
  findByIdUser(userId: string): Promise<Address | undefined>
  create(addressData: ICreateAddressDTO): Promise<Address>
  save(address: Address): Promise<Address>
}
