interface IUnity {
  unity: string
  value: number
}

export interface IInterpretationCreateDTO {
  tb_1_clay: IUnity
  tb_2_ph: IUnity
  tb_3_p_phosphor: IUnity
  tb_3_s_sulfur: IUnity
  tb_3_b_boron: IUnity
  tb_3_cu_copper: IUnity
  tb_3_k_potassium: IUnity
  tb_3_fe_iron: IUnity
  tb_3_mn_manganese: IUnity
  tb_3_zn_zinc: IUnity
  tb_4_ca_calcium: IUnity
  tb_4_mg_magnesium: IUnity
  _calculate_ctcph7: IUnity
  _calculate_v_base_saturation: IUnity
  _calculate_m_aluminum_saturation: IUnity
}

export interface IInterpretationDTO {
  value: string
  context: string | undefined
}

export interface IInterpretationResponseDTO {
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
