import { IFertilizingResponseDTO } from '../providers/CalculatorEngineProvider/dtos/FertilizingDTO'

interface IUnity {
  unity: string
  value: number
}

export interface IDataSampleDTO {
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
  fertilizing_objective_culture?: string | undefined
  carbon_stock_density_soil?: string | undefined
}

export default interface ISampleResponseDTO {
  id: string
  user_id: string
  description_cuture: string
  data_sample: IDataSampleDTO
  interpretation_: {
    inter_tb_1_soil_class: string
    inter_tb_2_ph: string
    inter_tb_3_p_phosphor: string
    inter_tb_3_s_sulfur: string
    inter_tb_3_b_boron: string
    inter_tb_3_cu_copper: string
    inter_tb_3_k_potassium: string
    inter_tb_3_fe_iron: string
    inter_tb_3_mn_manganese: string
    inter_tb_3_zn_zinc: string
    inter_tb_4_ca_calcium: string
    inter_tb_4_mg_magnesium: string
    inter_tb_5_ctcph7: string
    inter_tb_6_v_base_saturation: string
    inter_tb_6_m_aluminum_saturation: string
  }
  calculations_: {
    generic: {
      _ctcef: IUnity
      _ctcph7: IUnity
      _sum_bases: IUnity
      _v_base_saturation: IUnity
      _m_aluminum_saturation: IUnity
    }
    liming: {
      _liming_NCpH60: IUnity
      _liming_NCpH70: IUnity
      _liming_NCpH70cPRNT70porc: IUnity
    } | null
    plaster: {
      _calculate_plaster_need: IUnity
    } | null
    fertilizing: IFertilizingResponseDTO[] | null
    carbon_stock: {
      _carb_density_soil?: string | undefined
      _carb_value: IUnity
    } | null
  }
  created_at: Date
  updated_at: Date
  city: string
  uf: string
}
