import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import Collaborator from './Collaborator'

@Entity('mapping_report')
class MappingReport {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  collaborator_id: string

  @ManyToOne(() => Collaborator)
  @JoinColumn({ name: 'collaborator_id' })
  collaborator: Collaborator

  @Column()
  row_start: string

  @Column()
  type: string

  @Column()
  row_finish: string

  @Column()
  row_position: string

  @Column()
  units: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default MappingReport
