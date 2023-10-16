import { CalculateEnum } from '../enum/calculate.enum'
import { IObjectiveCulture } from '../providers/CalculatorEngineProvider/dtos/FertilizingDTO'

export interface IUnity {
  unity: 'cmol' | 'tha' | '%' | 'mgdm' | 'h2o' | 'cacl' | 'gdm' | 'gkg' | 'kgkg'
  value: number
}

export interface ICreateSample {
  user_id: string
  calculate: CalculateEnum[]
  description_cuture: string
  tb_1_description_deep_culture: string
  tb_1_clay: IUnity
  tb_1_silt: IUnity
  tb_1_sand: IUnity
  tb_2_organic_matter: IUnity
  tb_2_ph: IUnity
  tb_3_p_phosphor: IUnity
  tb_3_k_potassium: IUnity
  tb_3_na_sodium: IUnity
  tb_3_s_sulfur: IUnity
  tb_3_b_boron: IUnity
  tb_3_cu_copper: IUnity
  tb_3_fe_iron: IUnity
  tb_3_mn_manganese: IUnity
  tb_3_zn_zinc: IUnity
  tb_4_ca_calcium: IUnity
  tb_4_mg_magnesium: IUnity
  tb_4_al_aluminum: IUnity
  tb_4_h_al_potential_acidity: IUnity
  fertilizing_objective_culture?: IObjectiveCulture[]
  carbon_stock_density_soil?: string
  city: string
  uf: string
}
