import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'

import { Exclude } from 'class-transformer'
import UserSettings from './UserSettings'
import UserComments from './UserComments'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Exclude()
  settings_id: string

  @OneToOne(() => UserSettings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'settings_id' })
  settings: UserSettings

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @OneToMany(() => UserComments, (comment) => comment.user)
  comment: UserComments[]
}

export default User
