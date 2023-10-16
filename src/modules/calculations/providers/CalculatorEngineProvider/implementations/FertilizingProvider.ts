import {
  INTERPRETATION_MATCH,
  FIELDS_CULTURE_THA,
  FIELDS_CULTURE_VALUES,
  FIELDS_CULTURE_VALUES_BEFORE,
  FIELDS_PEPINO,
} from '../config/interpretationValues'
import {
  IFertilizingCreateDTO,
  IFertilizingResponseDTO,
  IObjectiveCulture,
} from '../dtos/FertilizingDTO'
import nitrogenMO, {
  microNutrients,
  PKInter,
} from '../functions/interpretationFertilizing'
import IFertilizingProvider from '../models/IFertilizingProvider'
import { compareClayClass } from '../functions/compareClayClass'

const {
  ARROZ_DE_SEQUEIRO,
  FEIJAO,
  MILHO,
  SOJA,
  SORGO,
  GRAMINEAS,
  ABOBORA,
  ABOBORAMORANGA,
  ALFACE,
  CHICORIA,
  ALMEIRAO,
  RUCULA,
  ALHO,
  BETERRABA,
  CENOURA,
  MELANCIA,
  MELAO,
  BATATADOCE,
  PEPINO,
  PIMENTAO,
  TOMATE,
  BATATA,
  MANDIOCA,
  ABACAXI,
  MARACUJA,
  EUCALIPTO,
  CANA_DE_ACUCAR,
} = FIELDS_CULTURE_VALUES

const { LEGUMINOSA, CONSORCIO_OU_POUSIO, GRAMINEA } =
  FIELDS_CULTURE_VALUES_BEFORE

const {
  INTERMO001,
  INTERMO002,
  INTERMO003,
  INTERPK001,
  INTERPK002,
  INTERPK003,
} = INTERPRETATION_MATCH

const { _6A8, _9A11, _12A15 } = FIELDS_CULTURE_THA

const { PARACONSERVA, PARASALADA } = FIELDS_PEPINO

export default class FertilizingProvider implements IFertilizingProvider {
  public fertilizingCalculator(
    data: IFertilizingCreateDTO,
  ): IFertilizingResponseDTO[] {
    const {
      _organicMatter,
      _interPhosphor,
      _interPotassium,
      _interZinc,
      _interBoron,
      _objectiveCulture,
      _clayContent,
    } = data

    const fertlizing = _objectiveCulture.map(
      (oc: IObjectiveCulture): IFertilizingResponseDTO => {
        const {
          culture,
          culture_before,
          n_nitron_tha,
          p_phosphor_tha,
          property_designation,
          p_phosphor_for_expectation,
          k_potassium_for_expectation,
          k_potassium_tha,
          p_k_for_expectation,
        } = oc

        const item: IFertilizingResponseDTO = {
          objetive_culture: culture,
        } as IFertilizingResponseDTO

        switch (culture) {
          case ARROZ_DE_SEQUEIRO:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [60, 55, 25],
                }),
              }),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [100, 60, 50, 20, 0],
                      1: [60, 40, 20, 20, 20],
                    },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [100, 60, 50, 20, 0],
                      1: [60, 40, 20, 20, 20],
                    },
                  },
                })),
            }

          case FEIJAO:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [50, 30, 20],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [105, 65, 55, 25, 0],
                      1: [65, 45, 25, 25, 25],
                    },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [110, 70, 60, 30, 0],
                      1: [70, 50, 30, 20, 30],
                    },
                  },
                })),
            }

            break

          case MILHO:
            return {
              ...item,
              ...(culture_before && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO002,
                  nitrogenValues: {
                    property: culture_before,
                    properties: [LEGUMINOSA, CONSORCIO_OU_POUSIO, GRAMINEA],
                    values: {
                      0: [70, 50, 30],
                      1: [80, 60, 40],
                      2: [90, 70, 50],
                    },
                  },
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: _interPhosphor,
                    properties: ['1', '2'],
                    values: {
                      0: [125, 85, 75, 45, 0],
                      1: [85, 65, 45, 45, 45],
                    },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: _interPhosphor,
                    properties: ['1', '2'],
                    values: {
                      0: [110, 70, 60, 30, 0],
                      1: [70, 50, 30, 30, 30],
                    },
                  },
                })),
            }
            break

          case SOJA:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [110, 70, 60, 30, 0],
                      1: [70, 50, 30, 30, 30],
                    },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [125, 85, 75, 45, 0],
                      1: [85, 65, 45, 45, 45],
                    },
                  },
                })),
            }
            break

          case SORGO:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [60, 40, 20],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [115, 75, 65, 35, 0],
                      1: [75, 55, 35, 35, 35],
                    },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [105, 65, 55, 25, 0],
                      1: [65, 45, 25, 25, 25],
                    },
                  },
                })),
            }
            break

          case GRAMINEAS:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: ['200', 'de 100 a 200', '100'],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [120, 100, 80, 60, 0],
                      1: [100, 80, 60, 60, 60],
                    },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK002,
                  pkValues: {
                    property: null,
                    properties: ['1', '2'],
                    values: {
                      0: [120, 100, 80, 60, 0],
                      1: [100, 60, 60, 60, 60],
                    },
                  },
                })),
            }
            break

          case ABOBORA:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [60, 46, 25],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 180, 140, 100, 80] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [170, 130, 90, 60, 60] },
                  },
                })),
            }
            break

          case ABOBORAMORANGA:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [60, 46, 25],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 180, 140, 100, 80] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [170, 130, 90, 60, 60] },
                  },
                })),
            }
            break

          case ALFACE:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: ['de 150 a 200', 100, 80],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [200, 140, 100, 70, 40] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 200, 160, 120, 90] },
                  },
                })),
            }
            break

          case CHICORIA:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: ['de 150 a 200', 100, 80],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [200, 140, 100, 70, 40] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 200, 160, 120, 90] },
                  },
                })),
            }
            break

          case ALMEIRAO:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: ['de 150 a 200', 100, 80],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [200, 140, 100, 70, 40] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 200, 160, 120, 90] },
                  },
                })),
            }
            break

          case RUCULA:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: ['de 150 a 200', 100, 80],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [200, 140, 100, 70, 40] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 200, 160, 120, 90] },
                  },
                })),
            }
            break

          case ALHO:
            return {
              ...item,
              ...(property_designation && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO002,
                  nitrogenValues: {
                    property: property_designation,
                    properties: [_6A8, _9A11, _12A15],
                    values: {
                      0: [150, 135, 120],
                      1: [225, 210, 180],
                      2: [300, 270, 255],
                    },
                  },
                }),
              }),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: [_6A8, _9A11, _12A15],
                    values: {
                      0: [300, 250, 200, 150, 130],
                      1: [450, 380, 300, 250, 220],
                      2: [600, 500, 400, 300, 260],
                    },
                  },
                })),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: [_6A8, _9A11, _12A15],
                    values: {
                      0: [300, 240, 180, 120, 100],
                      1: [450, 360, 270, 180, 150],
                      2: [600, 480, 360, 240, 200],
                    },
                  },
                })),
              ...(property_designation &&
                microNutrients({
                  inter: { zn: _interZinc, b: _interBoron, type: 'solo' },
                  enters: {
                    property: property_designation,
                    properties: [_6A8, _9A11, _12A15],
                    values: {
                      0: {
                        zn: [9, 6, 3],
                        b: [0.6, 0.4, 0],
                      },
                      1: {
                        zn: [12, 9, 6],
                        b: [0.8, 0.6, 0.4],
                      },
                      2: {
                        zn: [15, 12, 9],
                        b: [1, 0.8, 0.6],
                      },
                    },
                  },
                })),
            }
            break

          case BETERRABA:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [100, 70, 50],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 200, 150, 100, 50] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 180, 140, 100, 50] },
                  },
                })),
            }
            break

          case CENOURA:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [100, 70, 50],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 200, 150, 100, 50] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 180, 140, 100, 50] },
                  },
                })),
            }
            break

          case MELANCIA:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [100, 70, 50],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 180, 140, 100, 80] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [270, 230, 190, 150, 80] },
                  },
                })),
            }
            break

          case MELAO:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [100, 70, 50],
                }),
              }),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 180, 140, 100, 80] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [270, 230, 190, 150, 80] },
                  },
                })),
            }
            break

          case PIMENTAO:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [110, 50, 50],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [240, 180, 140, 100, 80] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [270, 230, 190, 150, 120] },
                  },
                })),
            }
            break

          case BATATADOCE:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [70, 40, 30],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [50, 50, 50, 50, 50] },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: { 0: [220, 180, 120, 80, 60] },
                  },
                })),
            }
            break

          case PEPINO:
            return {
              ...item,
              ...(property_designation && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO002,
                  nitrogenValues: {
                    property: property_designation,
                    properties: [PARACONSERVA, PARASALADA],
                    values: {
                      0: ['80-120', '60-80', '200-240'],
                      1: ['200-240', '160-200', '140-160'],
                    },
                  },
                }),
              }),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: [PARACONSERVA, PARASALADA],
                    values: {
                      0: [250, 200, 150, 120, 100],
                      1: [500, 420, 340, 260, 180],
                    },
                  },
                })),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: [PARACONSERVA, PARASALADA],
                    values: {
                      0: [220, 180, 140, 100, 80],
                      1: [400, 350, 300, 200, 160],
                    },
                  },
                })),
            }
            break

          case TOMATE:
            return {
              ...item,
              ...(property_designation && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO003,
                  nitrogenValues: {
                    property: property_designation,
                    properties: ['50', '75', '100'],
                    values: {
                      0: [50],
                      1: [100],
                      2: [150],
                    },
                  },
                }),
              }),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: ['50', '75', '100'],
                    values: {
                      0: [450, 300, 250, 200, 180],
                      1: [600, 450, 300, 250, 230],
                      2: [750, 600, 450, 300, 250],
                    },
                  },
                })),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: ['50', '75', '100'],
                    values: {
                      0: [225, 150, 120, 100, 80],
                      1: [300, 225, 150, 120, 100],
                      2: [375, 300, 225, 150, 125],
                    },
                  },
                })),
            }
            break

          case BATATA:
            return {
              ...item,
              ...(property_designation && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO002,
                  nitrogenValues: {
                    property: property_designation,
                    properties: ['<=20', '>20'],
                    values: {
                      0: [120, 100, 80],
                      1: [160, 140, 120],
                    },
                  },
                }),
              }),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: ['<=20', '>20'],
                    values: {
                      0: [280, 220, 160, 120, 80],
                      1: [360, 280, 200, 140, 100],
                    },
                  },
                })),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: ['<=20', '>20'],
                    values: {
                      0: [180, 160, 140, 120, 120],
                      1: [220, 180, 160, 140, 140],
                    },
                  },
                })),
            }
            break

          case MANDIOCA:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO003,
                  nitrogenValues: {
                    property: compareClayClass(_clayContent),
                    properties: ['1-2-3', '4'],
                    values: {
                      0: [50, 50, 20],
                      1: [80, 40, 20],
                    },
                  },
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_tha || '1',
                    properties: ['1'],
                    values: {
                      0: [30, 30, 30, 30, 30],
                    },
                  },
                })),
              ...(_clayContent &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: compareClayClass(_clayContent),
                    properties: ['1-2-3', '4'],
                    values: {
                      0: [40, 40, 20, 20, 0],
                      1: [60, 60, 40, 20, 0],
                    },
                  },
                })),
            }
            break

          case ABACAXI:
            return {
              ...item,
              ...(property_designation && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO003,
                  nitrogenValues: {
                    property: property_designation,
                    properties: ['Primeira safra', 'Segunda safra'],
                    values: {
                      0: ['E1: 1,3, E2: 4,0, E3: 2,0'],
                      1: ['E4: 2,0, E5: 2,0'],
                    },
                  },
                }),
              }),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: ['Primeira safra', 'Segunda safra'],
                    values: {
                      0: [200, 160, 120, 80, 80],
                      1: [80, 80, 80, 80, 80],
                    },
                  },
                })),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: ['Primeira safra', 'Segunda safra'],
                    values: {
                      0: [11, 10, 10, 7, 7],
                      1: [8, 8, 8, 7, 7],
                    },
                  },
                })),
            }
            break

          case EUCALIPTO:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [25, 15, 10],
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_phosphor_for_expectation || '1',
                    properties: ['1'],
                    values: {
                      0: [120, 90, 60, 30, 30],
                    },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: k_potassium_for_expectation || '1',
                    properties: ['1'],
                    values: {
                      0: [50, 30, 25, 15, 0],
                    },
                  },
                })),
            }
            break

          case CANA_DE_ACUCAR:
            return {
              ...item,
              ...((_organicMatter >= 0 ||
                typeof _organicMatter === 'string') && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO001,
                  values: [100, 70, 50],
                }),
              }),
              ...(p_k_for_expectation &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_k_for_expectation,
                    properties: ['<80', '80a100', '>100'],
                    values: {
                      0: [100, 90, 70, 50, 0],
                      1: [120, 80, 60, 40, 0],
                      2: [140, 110, 90, 60, 60],
                    },
                  },
                })),
              ...(p_k_for_expectation &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: p_k_for_expectation,
                    properties: ['<80', '80a100', '>100'],
                    values: {
                      0: [90, 70, 50, 30, 30],
                      1: [110, 80, 50, 40, 40],
                      3: [130, 100, 80, 60, 60],
                    },
                  },
                })),
            }
            break

          case MARACUJA:
            return {
              ...item,
              ...(property_designation && {
                n_nitrogen: nitrogenMO({
                  mo: _organicMatter,
                  calculeMatch: INTERMO003,
                  nitrogenValues: {
                    property: property_designation,
                    properties: ['1º ano', '2º ano', '3º ano'],
                    values: {
                      0: [90, 70],
                      1: [120, 80],
                      2: [120, 80],
                    },
                  },
                }),
              }),
              ...(_interPhosphor &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK003,
                  pkValues: {
                    property: null,
                    properties: ['1'],
                    values: {
                      0: [90, 60, 30, 0, 0],
                    },
                  },
                })),
              ...(_interPotassium &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK003,
                  pkValues: {
                    property: null,
                    properties: ['1'],
                    values: {
                      0: [100, 70, 40, 20, 0],
                    },
                  },
                })),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPhosphor, type: 'phosphor' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: ['1º ano', '2º ano', '3º ano'],
                    values: {
                      0: [50, 45, 45, 40, 40],
                      1: [60, 50, 45, 40, 40],
                      2: [50, 45, 45, 40, 40],
                    },
                  },
                })),
              ...(property_designation &&
                PKInter({
                  inter: { name: _interPotassium, type: 'potassium' },
                  calculeMatch: INTERPK001,
                  pkValues: {
                    property: property_designation,
                    properties: ['1º ano', '2º ano', '3º ano'],
                    values: {
                      0: [30, 30, 20, 20, 20],
                      1: [100, 80, 80, 60, 60],
                      2: [140, 130, 110, 90, 80],
                    },
                  },
                })),
            }
            break

          default:
            return {} as IFertilizingResponseDTO
          // break;
        }
      },
    )

    return fertlizing
  }
}
