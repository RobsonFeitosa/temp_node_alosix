import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import uploadConfig from '@config/upload'

import User from '@modules/users/infra/typeorm/entities/User'
import { Expose } from 'class-transformer'

@Entity('collaborator')
class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  type: string

  @Column()
  name: string

  @Column()
  logo: string

  @Column()
  report_example: string

  @Column()
  balance: number

  @Column()
  redirected_percentage: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'logo_url' })
  getCollaboratorLogo(): string | null {
    if (!this.logo) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.logo}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.logo}`
      default:
        return null
    }
  }
}

export default Collaborator
