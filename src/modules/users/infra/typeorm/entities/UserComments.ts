import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Exclude } from 'class-transformer'
import UserSettings from './UserSettings'
import UserTransactions from './UserTransactions'
import User from './User'

@Entity('comments')
class UserComments {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Exclude()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  comment: string

  @Column()
  type: string

  @Column()
  note: number

  @Column()
  is_public: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default UserComments
