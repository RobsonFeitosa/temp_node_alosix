export default interface ICreateCreditCardDTO {
  user_id: string
  card_id: string
  number: string
  holder_name: string
  expiration_date: string
  brand: string
  actived: boolean
}
