export default interface ICreateUserTransactionsDTO {
  user_id: string
  order_id: string
  amount: number
  status: string
  brand: string
  payment_method?: string
  tid: string
}
