import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import User from './User'

@Entity('credit_cards')
class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @Column()
  card_id: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  number: string

  @Column()
  holder_name: string

  @Column()
  expiration_date: string

  @Column()
  brand: string

  @Column()
  actived: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default CreditCard
