import IInterpretationProvider from '../models/IInterpretationProvider'

import {
  IInterpretationCreateDTO,
  IInterpretationResponseDTO,
} from '../dtos/IInterpretationDTO'

import {
  ClayInter,
  pHInter,
  pPhosphorMelichInter,
  kPotassiumInter,
  sSulfurInter,
  bBoronInter,
  cuCopperInter,
  feIronInter,
  mnManganeseaInter,
  znZincInter,
  caCalciumInter,
  mgMagnesiumInter,
  ctcph7Inter,
  mAluminumSaturationInter,
  vBaseSaturationInter,
} from '../functions/interpretationSample'

import { convertCmol, phConvert } from '../utils/convertUnity'

export default class InterpretationProvider implements IInterpretationProvider {
  public interpratationCalculator(
    data: IInterpretationCreateDTO,
  ): IInterpretationResponseDTO {
    const interpretation: IInterpretationResponseDTO =
      {} as IInterpretationResponseDTO

    const {
      tb_1_clay,
      tb_2_ph,
      tb_3_p_phosphor,
      tb_3_s_sulfur,
      tb_3_b_boron,
      tb_3_cu_copper,
      tb_3_k_potassium,
      tb_3_fe_iron,
      tb_3_mn_manganese,
      tb_3_zn_zinc,
      tb_4_ca_calcium,
      tb_4_mg_magnesium,
      _calculate_ctcph7,
      _calculate_v_base_saturation,
      _calculate_m_aluminum_saturation,
    } = data

    if (tb_1_clay.value) {
      interpretation.inter_tb_1_soil_class = ClayInter(tb_1_clay.value / 10)
    }

    if (tb_3_p_phosphor.value) {
      interpretation.inter_tb_3_p_phosphor = pPhosphorMelichInter(
        tb_3_p_phosphor.value,
      )
    }

    if (tb_2_ph.value) {
      interpretation.inter_tb_2_ph = pHInter(phConvert(tb_2_ph))
    }

    if (tb_3_s_sulfur.value) {
      interpretation.inter_tb_3_s_sulfur = sSulfurInter(tb_3_s_sulfur.value)
    }

    if (tb_3_b_boron.value) {
      interpretation.inter_tb_3_b_boron = bBoronInter(tb_3_b_boron.value)
    }

    if (tb_3_k_potassium.value && _calculate_ctcph7.value) {
      interpretation.inter_tb_3_k_potassium = kPotassiumInter({
        ctcph7: _calculate_ctcph7.value,
        k: tb_3_k_potassium.value,
      })
    }

    if (tb_3_cu_copper.value) {
      interpretation.inter_tb_3_cu_copper = cuCopperInter(tb_3_cu_copper.value)
    }

    if (tb_3_fe_iron.value) {
      interpretation.inter_tb_3_fe_iron = feIronInter(tb_3_fe_iron.value)
    }

    if (tb_3_mn_manganese.value) {
      interpretation.inter_tb_3_mn_manganese = mnManganeseaInter(
        tb_3_mn_manganese.value,
      )
    }

    if (tb_3_zn_zinc.value) {
      interpretation.inter_tb_3_zn_zinc = znZincInter(tb_3_zn_zinc.value)
    }

    if (tb_4_ca_calcium.value) {
      interpretation.inter_tb_4_ca_calcium = caCalciumInter(
        convertCmol(tb_4_ca_calcium),
      )
    }

    if (tb_4_mg_magnesium.value) {
      interpretation.inter_tb_4_mg_magnesium = mgMagnesiumInter(
        convertCmol(tb_4_mg_magnesium),
      )
    }

    if (_calculate_ctcph7.value) {
      interpretation.inter_tb_5_ctcph7 = ctcph7Inter(
        convertCmol(_calculate_ctcph7),
      )
    }

    if (_calculate_v_base_saturation.value) {
      interpretation.inter_tb_6_v_base_saturation = vBaseSaturationInter(
        _calculate_v_base_saturation.value,
      )
    }

    if (_calculate_m_aluminum_saturation.value) {
      interpretation.inter_tb_6_m_aluminum_saturation =
        mAluminumSaturationInter(_calculate_m_aluminum_saturation.value)
    }

    return interpretation
  }
}
