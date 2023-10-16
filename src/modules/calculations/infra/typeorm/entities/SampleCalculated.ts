import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm'

import Samples from '@modules/calculations/infra/typeorm/entities/Samples'

@Entity('samples_calculated')
class SampleCalculated {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  sample_id: string

  @OneToOne(() => Samples)
  @JoinColumn({ name: 'sample_id' })
  user: Samples

  @Column()
  interpretation: string

  @Column()
  calculation: string
}

export default SampleCalculated
