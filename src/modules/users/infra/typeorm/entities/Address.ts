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

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  zipcode: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  country: string

  @Column()
  neighborhood: string

  @Column()
  street: string

  @Column()
  street_number: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Address
