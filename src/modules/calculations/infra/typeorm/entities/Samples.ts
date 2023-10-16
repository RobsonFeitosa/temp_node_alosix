import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'

@Entity('samples')
class Sample {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  description_cuture: string

  @Column()
  tb_1_description_deep_culture: string

  @Column()
  tb_1_clay: string

  @Column()
  tb_1_silt: string

  @Column()
  tb_1_sand: string

  @Column()
  tb_2_organic_matter: string

  @Column()
  tb_2_ph: string

  @Column()
  tb_3_p_phosphor: string

  @Column()
  tb_3_k_potassium: string

  @Column()
  tb_3_na_sodium: string

  @Column()
  tb_3_s_sulfur: string

  @Column()
  tb_3_b_boron: string

  @Column()
  tb_3_cu_copper: string

  @Column()
  tb_3_fe_iron: string

  @Column()
  tb_3_mn_manganese: string

  @Column()
  tb_3_zn_zinc: string

  @Column()
  tb_4_ca_calcium: string

  @Column()
  tb_4_mg_magnesium: string

  @Column()
  tb_4_al_aluminum: string

  @Column()
  tb_4_h_al_potential_acidity: string

  @Column()
  fertilizing_objective_culture?: string

  @Column()
  carbon_stock_density_soil?: string

  @Column()
  city: string

  @Column()
  uf: string

  @DeleteDateColumn()
  deleted_at: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Sample
