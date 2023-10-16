import ICalculatorProvider from '../models/ICalculatorProvider'

import {
  somaDeBasesCalc,
  ctcefCalc,
  ctcph7Calc,
  mSaturacaoAluminioCalc,
  vSaturacaoBasesCalc,
  ncph7Calc,
  ncph7prnt7Calc,
  ngCalc,
  ncph6Calc,
  cot,
} from '../functions/calculationSample'

import {
  convertCmol,
  convertMGdm,
  moConvert,
  naSodio,
} from '../utils/convertUnity'

import {
  ICalculatorCarbonStockDTO,
  ICalculatorCreateDTO,
  ICalculatorGenericDTO,
  ICalculatorLimingDTO,
  ICalculatorPlasterDTO,
  ICalculatorResponseDTO,
  ICalculatorWaterAvailabilityDTO,
  ITriedSample,
} from '../dtos/ICalculatorDTO'
import {
  bBoronInter,
  kPotassiumInter,
  pPhosphorMelichInter,
  znZincInter,
} from '../functions/interpretationSample'
import Sample from '@modules/calculations/infra/typeorm/entities/Samples'
import { inject, injectable } from 'tsyringe'
import IInterpretationProvider from '../models/IInterpretationProvider'
import { IDataSampleDTO } from '@modules/calculations/dtos/ISamplesResponseDTO'
import { IFertilizingResponseDTO } from '../dtos/FertilizingDTO'
import IFertilizingProvider from '../models/IFertilizingProvider'

interface ILimingCalculatedDTO {
  data: ICalculatorCreateDTO
  _calculate_ctcph7: number
  _calculate_base_saturation: number
}

interface IPlasterCalculatedDTO {
  data: ICalculatorCreateDTO
  _calculate_ctcef: number
}

interface IFertilizingCalculatedDTO {
  data: ICalculatorCreateDTO
  _calculate_ctcph7: number
}

@injectable()
export default class CalculatorProvider implements ICalculatorProvider {
  constructor(
    @inject('InterpretationProvider')
    private interpretationProvider: IInterpretationProvider,

    @inject('FertilizingProvider')
    private fertilizingProvider: IFertilizingProvider,
  ) {}

  public calculatorEngine(
    sample: Sample,
    calculates: string[],
  ): ICalculatorResponseDTO {
    const isEmptyCalculates = calculates && calculates.length === 0

    const onCalculator = {
      interpretation_: true,
      liming: !isEmptyCalculates && calculates.includes('liming'),
      plaster: !isEmptyCalculates && calculates.includes('plaster'),
      carbon_stock: !isEmptyCalculates && calculates.includes('carbon_stock'),
      fertilizing: !isEmptyCalculates && calculates.includes('fertilizing'),
      water_availability:
        !isEmptyCalculates && calculates.includes('water_availability'),
    }

    const {
      user_id,
      user,
      id,
      description_cuture,
      city,
      uf,
      created_at,
      updated_at,
      fertilizing_objective_culture,
      carbon_stock_density_soil,
      tb_1_description_deep_culture,
      ...dataSamplesPartial
    } = sample

    const dataSampleParse = {} as IDataSampleDTO

    Object.entries(dataSamplesPartial).forEach(([key, value]) => {
      if (typeof value === 'string') {
        ;(dataSampleParse as any)[key] = JSON.parse(value)
      }
    })
    const _calculatedGeneric = this._calcGeneric(dataSampleParse)

    const interpretation_ =
      this.interpretationProvider.interpratationCalculator({
        tb_1_clay: dataSampleParse.tb_1_clay,
        tb_2_ph: dataSampleParse.tb_2_ph,
        tb_3_p_phosphor: dataSampleParse.tb_3_p_phosphor,
        tb_3_s_sulfur: dataSampleParse.tb_3_s_sulfur,
        tb_3_b_boron: dataSampleParse.tb_3_b_boron,
        tb_3_cu_copper: dataSampleParse.tb_3_cu_copper,
        tb_3_k_potassium: dataSampleParse.tb_3_k_potassium,
        tb_3_fe_iron: dataSampleParse.tb_3_fe_iron,
        tb_3_mn_manganese: dataSampleParse.tb_3_mn_manganese,
        tb_3_zn_zinc: dataSampleParse.tb_3_zn_zinc,
        tb_4_ca_calcium: dataSampleParse.tb_4_ca_calcium,
        tb_4_mg_magnesium: dataSampleParse.tb_4_mg_magnesium,
        _calculate_v_base_saturation: _calculatedGeneric._v_base_saturation,
        _calculate_m_aluminum_saturation:
          _calculatedGeneric._m_aluminum_saturation,
        _calculate_ctcph7: _calculatedGeneric._ctcph7,
      })

    const _calcLiming = this._calcLiming(
      {
        data: dataSampleParse,
        _calculate_ctcph7: _calculatedGeneric._ctcph7.value,
        _calculate_base_saturation: _calculatedGeneric._v_base_saturation.value,
      },
      onCalculator.liming,
    )

    const _calcPlaster = this._calcPlaster(
      {
        data: dataSampleParse,
        _calculate_ctcef: _calculatedGeneric._ctcef.value,
      },
      onCalculator.plaster,
    )

    const _calcCarbonStock = this._calcCarbonStock(
      {
        ...dataSampleParse,
        tb_1_description_deep_culture,
        carbon_stock_density_soil,
      },
      onCalculator.carbon_stock,
    )

    const _calcFertilizing = this._calcFertilizing(
      {
        data: {
          ...dataSampleParse,
          fertilizing_objective_culture,
        },
        _calculate_ctcph7: _calculatedGeneric._ctcph7.value,
      },
      onCalculator.fertilizing,
    )

    const _calcWater = this._calcWater(
      { silt: dataSampleParse.tb_1_silt, clay: dataSampleParse.tb_1_clay },
      onCalculator.water_availability,
    )

    const calculations_ = {
      generic: _calculatedGeneric,
      liming: _calcLiming,
      plaster: _calcPlaster,
      carbon_stock: _calcCarbonStock,
      fertilizing: _calcFertilizing,
      water_availability: _calcWater,
    }

    return {
      interpretation_,
      calculations_,
    }
  }

  _calcGeneric(dataSample: ICalculatorCreateDTO): ICalculatorGenericDTO {
    const {
      tb_3_na_sodium,
      tb_3_k_potassium,
      tb_4_ca_calcium,
      tb_4_mg_magnesium,
      tb_4_al_aluminum,
      tb_4_h_al_potential_acidity,
    } = dataSample

    const _ctcef = {
      value: ctcefCalc({
        k: convertCmol(tb_3_k_potassium),
        ca: convertCmol(tb_4_ca_calcium),
        mg: convertCmol(tb_4_mg_magnesium),
        al: convertCmol(tb_4_al_aluminum),
      }),
      unity: 'cmol',
    }

    const _ctcph7 = {
      value: ctcph7Calc({
        k: convertCmol(tb_3_k_potassium),
        na: naSodio(tb_3_na_sodium),
        ca: convertCmol(tb_4_ca_calcium),
        mg: convertCmol(tb_4_mg_magnesium),
        h_al: convertCmol(tb_4_h_al_potential_acidity),
      }),
      unity: 'cmol',
    }

    const _sum_bases = {
      value: somaDeBasesCalc({
        k: convertCmol(tb_3_k_potassium),
        ca: convertCmol(tb_4_ca_calcium),
        mg: convertCmol(tb_4_mg_magnesium),
      }),
      unity: 'cmol',
    }

    const _v_base_saturation = {
      value: vSaturacaoBasesCalc({
        ctcph: _ctcph7.value,
        sb: _sum_bases.value,
      }),
      unity: 'cmol',
    }

    const _m_aluminum_saturation = {
      value: mSaturacaoAluminioCalc({
        ctcef: _ctcef.value,
        al: convertCmol(tb_4_al_aluminum),
      }),
      unity: 'cmol',
    }

    const generic = {
      _ctcef,
      _ctcph7,
      _sum_bases,
      _v_base_saturation,
      _m_aluminum_saturation,
    }

    return generic
  }

  _calcLiming(
    data: ILimingCalculatedDTO,
    active: boolean,
  ): ICalculatorLimingDTO | null {
    const { tb_4_al_aluminum, tb_2_organic_matter } = data.data

    const _liming_NCpH60 = {
      value: ncph6Calc({
        mo: moConvert(tb_2_organic_matter),
        al: convertCmol(tb_4_al_aluminum),
      }),
      unity: 'tha',
    }

    const _liming_NCpH70 = {
      value: ncph7Calc({
        ctcph7: data._calculate_ctcph7,
        s_sb: data._calculate_base_saturation,
        prnt: 100,
      }),
      unity: 'tha',
    }

    const _liming_NCpH70cPRNT70porc = {
      value: ncph7prnt7Calc({
        ncph7: _liming_NCpH70.value,
        prnt: 70,
      }),
      unity: 'tha',
    }

    const liming = {
      _liming_NCpH60,
      _liming_NCpH70,
      _liming_NCpH70cPRNT70porc,
    }

    return active ? liming : null
  }

  _calcPlaster(
    data: IPlasterCalculatedDTO,
    active: boolean,
  ): ICalculatorPlasterDTO | null {
    const { tb_4_ca_calcium } = data.data

    const _calculate_plaster_need = {
      value: ngCalc({
        ctcef: data._calculate_ctcef,
        ca: convertCmol(tb_4_ca_calcium),
      }),
      unity: 'tha',
    }

    const plaster = { _calculate_plaster_need }

    return active ? plaster : null
  }

  _calcCarbonStock(
    data: ICalculatorCreateDTO,
    active: boolean,
  ): ICalculatorCarbonStockDTO | null {
    const {
      tb_2_organic_matter,
      carbon_stock_density_soil,
      tb_1_description_deep_culture,
    } = data

    const _carb_value = {
      value: cot({
        mo: tb_2_organic_matter,
        ds: carbon_stock_density_soil || '0',
        deep: tb_1_description_deep_culture,
      }),
      unity: 'tha',
    }

    const carbon_stock = {
      _carb_density_soil: carbon_stock_density_soil,
      _carb_value,
    }

    return active ? carbon_stock : null
  }

  _calcFertilizing(
    data: IFertilizingCalculatedDTO,
    active: boolean,
  ): IFertilizingResponseDTO[] | null {
    const {
      tb_2_organic_matter,
      tb_3_b_boron,
      tb_3_k_potassium,
      tb_3_p_phosphor,
      tb_3_zn_zinc,
      tb_1_clay,
      fertilizing_objective_culture,
    } = data.data

    const calculateFertilizing = {
      _organicMatter: moConvert(tb_2_organic_matter),
      _clayContent: tb_1_clay.value,
      _interPhosphor: pPhosphorMelichInter(tb_3_p_phosphor.value),
      _interPotassium: kPotassiumInter({
        ctcph7: data._calculate_ctcph7,
        k: convertMGdm(tb_3_k_potassium),
      }),
      _interZinc: znZincInter(tb_3_zn_zinc.value),
      _interBoron: bBoronInter(tb_3_b_boron.value),
      _objectiveCulture: JSON.parse(fertilizing_objective_culture || ''),
    }

    const fertilizing =
      this.fertilizingProvider.fertilizingCalculator(calculateFertilizing)

    return active ? fertilizing : null
  }

  _calcWater(
    data: Omit<ITriedSample, 'sand'>,
    active: boolean,
  ): ICalculatorWaterAvailabilityDTO | null {
    const { silt, clay } = data

    const convertTriedSample = () => {
      const siltValue = silt.unity === '%' ? silt.value * 10 : silt.value

      const clayValue = clay.unity === '%' ? clay.value * 10 : clay.value

      return { siltValue, clayValue }
    }

    const { siltValue, clayValue } = convertTriedSample()

    const arrudaTetacc = () => {
      const total = siltValue + clayValue
      return (
        (3.1 + (0.629 * total) / 10 - (0.0034 * total) / Math.pow(10, 2)) / 100
      )
    }

    const arrudaTetapmp = () => {
      const total = siltValue + clayValue
      return 398.9 * (total / 10 / (1308.1 + total) / 100)
    }

    const arrudaTetaad = () => {
      return arrudaTetacc() - arrudaTetapmp()
    }

    const mengTetacc = () => {
      return -0.0044 + (0.0082 * clayValue) / 10
    }
    const mengTetapmp = () => {
      return -0.0028 + (0.0038 * clayValue) / 10
    }

    const mengTetaad = () => {
      return mengTetacc() - mengTetapmp()
    }

    const nascTetacc = () => {
      return 0.0409 + 0.000377 * clayValue + 0.000108 * siltValue
    }

    const nascTetapmp = () => {
      return 0.0221 + 0.000288 * clayValue
    }

    const response = {
      tetacc: {
        unity: 'kgkg',
        value: (arrudaTetacc() + mengTetacc() + nascTetacc()) / 3,
      },
      tetapmp: {
        unity: 'kgkg',
        value: (arrudaTetapmp() + mengTetapmp() + nascTetapmp()) / 3,
      },
      tetaad: { unity: 'kgkg', value: (arrudaTetaad() + mengTetaad()) / 2 },
    }

    return active ? response : null
  }
}
