export interface nitrogenDTO {
  culture: string
  mo: number
}

export interface fertilizingInterValuesDTO {
  interpretation: string
  culture: string
}

export interface IObjectiveCulture {
  culture: string
  culture_before?: string | undefined
  property_designation?: string | undefined
  n_nitron_tha?: string | undefined
  p_phosphor_for_expectation?: string | undefined
  p_phosphor_tha?: string | undefined
  k_potassium_tha?: string | undefined
  k_potassium_for_expectation?: string | undefined
  p_k_for_expectation?: string | undefined
}

export interface IFertilizingCreateDTO {
  _organicMatter: number
  _clayContent: number
  _interPhosphor: string
  _interPotassium: string
  _interZinc: string
  _interBoron: string
  _objectiveCulture: IObjectiveCulture[]
}

export interface IFertilizingResponseDTO {
  objetive_culture: string
  culture_before?: string | undefined
  n_nitrogen?: number | string | undefined
  p_phosphor_first_fertilizing?: number | undefined
  p_phosphor_second_fertilizing?: number | undefined
  p_phosphor_third_fertilizing?: number | undefined
  k_potassium_first_fertilizing?: number | undefined
  k_potassium_second_fertilizing?: number | undefined
  k_potassium_third_fertilizing?: number | undefined
  n_nitrogenio_between_tha?: string | undefined
  k_potassium_between_tha?: string | undefined
  p_phosphor_between_tha?: string | undefined
  micro_nutrients_zinc_boron?: string | undefined
  micro_nutrients?: string | undefined
}
