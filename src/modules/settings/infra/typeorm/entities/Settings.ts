import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'

@Entity('settings')
class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  location: string

  @Column()
  title: string

  @Column()
  subtitle1: string

  @Column()
  description1: string

  @Column()
  subtitle2: string

  @Column()
  description2: string

  @Column()
  subtitle3: string

  @Column()
  description3: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Settings
