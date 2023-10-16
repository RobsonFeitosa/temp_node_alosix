import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'
import UserTransactions from '@modules/users/infra/typeorm/entities/UserTransactions'
import { Exclude } from 'class-transformer'

@Entity('orders')
class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Exclude()
  @Column()
  user_id: string

  @Column()
  sample_id?: string

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  cod_order: string

  @Column()
  calculate_options: string

  @OneToMany(() => UserTransactions, (transaction) => transaction.order)
  transactions: UserTransactions[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Orders
