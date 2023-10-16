import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import uploadConfig from '@config/upload'

import { Expose } from 'class-transformer'

@Entity('users_settings')
class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  avatar: string

  @Column()
  level: 1 | 2

  @Column()
  cpf: string

  @Column()
  actived: boolean

  @Column()
  phone_number: string

  @Column({ nullable: true, default: true })
  is_first_calculation: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }
}

export default UserSettings
