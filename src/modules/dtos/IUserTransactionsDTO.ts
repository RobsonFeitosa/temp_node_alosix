import Order from '@modules/orders/infra/typeorm/entities/Order'
import User from '@modules/users/infra/typeorm/entities/User'

export interface IUserTransactionsDTO {
  id: string
  user_id: string
  user: User
  order_id: string
  order: Order
  amount: number
  status: string
  payment_method: string
  brand: string
  tid: string
  created_at: Date
  updated_at: Date
}
