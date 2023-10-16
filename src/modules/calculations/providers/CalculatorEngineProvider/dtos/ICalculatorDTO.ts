import { IFertilizingResponseDTO } from './FertilizingDTO'
import { IInterpretationResponseDTO } from './IInterpretationDTO'

interface IUnity {
  unity: string
  value: number
}

export interface ICalculatorCreateDTO {
  tb_1_clay: IUnity
  tb_1_description_deep_culture: string
  tb_2_organic_matter: IUnity
  tb_3_na_sodium: IUnity
  tb_3_p_phosphor: IUnity
  tb_3_k_potassium: IUnity
  tb_3_fe_iron: IUnity
  tb_3_zn_zinc: IUnity
  tb_3_b_boron: IUnity
  tb_4_ca_calcium: IUnity
  tb_4_al_aluminum: IUnity
  tb_4_mg_magnesium: IUnity
  tb_4_h_al_potential_acidity: IUnity
  carbon_stock_density_soil?: string | undefined
  fertilizing_objective_culture?: string | undefined
}

export interface ICalculatorGenericDTO {
  _ctcef: IUnity
  _ctcph7: IUnity
  _sum_bases: IUnity
  _v_base_saturation: IUnity
  _m_aluminum_saturation: IUnity
}

export interface ICalculatorLimingDTO {
  _liming_NCpH60: IUnity
  _liming_NCpH70: IUnity
  _liming_NCpH70cPRNT70porc: IUnity
}

export interface ICalculatorPlasterDTO {
  _calculate_plaster_need: IUnity
}

export interface ICalculatorCarbonStockDTO {
  _carb_density_soil?: string | undefined
  _carb_value: IUnity
}
export interface ICalculatorWaterAvailabilityDTO {
  tetacc: IUnity
  tetapmp: IUnity
  tetaad: IUnity
}

export interface ICalculations {
  generic: ICalculatorGenericDTO
  liming: ICalculatorLimingDTO | null
  plaster: ICalculatorPlasterDTO | null
  fertilizing: IFertilizingResponseDTO[] | null
  carbon_stock: ICalculatorCarbonStockDTO | null
  water_availability: ICalculatorWaterAvailabilityDTO | null
}
export interface ICalculatorResponseDTO {
  interpretation_: IInterpretationResponseDTO
  calculations_: ICalculations
}
export interface ITriedSample {
  sand: IUnity
  silt: IUnity
  clay: IUnity
}
