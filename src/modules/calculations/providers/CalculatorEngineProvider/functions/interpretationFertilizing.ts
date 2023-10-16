import {
  INTERPRETATION_MATCH,
  INTERPRETATION_VALUES,
} from '../config/interpretationValues'

const { MUITOBAIXO, BAIXO, MEDIO, ALTO, MUITOALTO } = INTERPRETATION_VALUES

const {
  INTERMO001,
  INTERMO002,
  INTERMO003,
  INTERPK001,
  INTERPK002,
  INTERPK003,
  INTERMO004,
} = INTERPRETATION_MATCH

interface INitrogenReq {
  mo: number
  calculeMatch: string
  nitrogenValues?: {
    property: string
    properties: Array<string | number>
    values: {
      [key: number]: Array<string | number>
    }
  }
  values?: Array<string | number> | undefined
}

interface IMicronutrientesReq {
  inter: {
    zn: string
    b: string
    type: string
  }

  enters?: {
    property: string
    properties: string[]
    values: {
      [key: number]: {
        zn: number[]
        b: number[]
      }
    }
  }
}

interface IMicronutrientesRes {
  micro_nutrients_zinc?: number | undefined
  micro_nutrients_boron?: number | undefined
}

interface IPKInterReq {
  inter: { name: string; type: string }
  calculeMatch: string
  pkValues?: {
    property: string | null
    properties: string[]
    values: {
      [key: number]: number[]
    }
  }
}

interface IPKInterRes {
  p_phosphor_fertilizing?: number | undefined
  p_phosphor_first_fertilizing?: number | undefined
  p_phosphor_second_fertilizing?: number | undefined
  p_phosphor_pre_planting_fertilizing?: number | undefined
  k_potassium_fertilizing?: number | undefined
  k_potassium_first_fertilizing?: number | undefined
  k_potassium_second_fertilizing?: number | undefined
  k_potassium_pre_planting_fertilizing?: number | undefined
}

export default function nitrogenMO({
  mo,
  calculeMatch,
  nitrogenValues,
  values,
}: INitrogenReq): number | string {
  const interCalc001 = () => {
    if (values) {
      switch (true) {
        case mo <= 2.5:
          return values[0]
          break
        case mo <= 5:
          return values[1]
          break
        case mo < 999999:
          return values[2]
          break
        default:
          return 0
          break
      }
    }
    return 'Não recomendado'
  }

  const interCalc002 = () => {
    if (nitrogenValues) {
      const callbackNitrogenio = (position: number): number | string => {
        switch (nitrogenValues?.property) {
          case nitrogenValues?.properties[0]:
            return nitrogenValues?.values[0][position]
            break
          case nitrogenValues?.properties[1]:
            return nitrogenValues?.values[1][position]
            break
          case nitrogenValues?.properties[2]:
            return nitrogenValues?.values[2][position]
            break
          default:
            return 0
            break
        }
      }

      switch (true) {
        case mo <= 2.5:
          return callbackNitrogenio(0)
          break
        case mo <= 5:
          return callbackNitrogenio(1)
          break
        case mo < 999999:
          return callbackNitrogenio(2)
          break
        default:
          return 0
          break
      }
    }
    return 'Não recomendado'
  }

  const interCalc003 = () => {
    if (nitrogenValues) {
      switch (nitrogenValues?.property) {
        case nitrogenValues?.properties[0]:
          return nitrogenValues?.values[0][0]
          break
        case nitrogenValues?.properties[1]:
          return nitrogenValues?.values[1][0]
          break
        case nitrogenValues?.properties[2]:
          return nitrogenValues?.values[2][0]
          break
        default:
          return 0
          break
      }
    }
    return 'Não recomendado'
  }

  const interCalc004 = () => {
    if (values) {
      switch (true) {
        case mo <= 2.5:
          return values[0]
          break
        case mo < 99999999:
          return values[1]
          break
        default:
          return 0
          break
      }
    }
    return 'Não recomendado'
  }

  switch (calculeMatch) {
    case INTERMO001:
      return interCalc001()
      break
    case INTERMO002:
      return interCalc002()
      break
    case INTERMO003:
      return interCalc003()
      break
    case INTERMO004:
      return interCalc004()
      break
    default:
      return 'Não recomendado'
      break
  }
}

export function microNutrients({
  inter,
  enters,
}: IMicronutrientesReq): IMicronutrientesRes {
  // Only alho use
  const callbackMicron = (position: number): IMicronutrientesRes => {
    switch (enters?.property) {
      case enters?.properties[0]:
        return {
          ...(inter.b && {
            micro_nutrients_boron: enters?.values[0].b[position],
          }),
          ...(inter.zn && {
            micro_nutrients_zinc: enters?.values[0].zn[position],
          }),
        }
        break
      case enters?.properties[1]:
        return {
          ...(inter.b && {
            micro_nutrients_boron: enters?.values[1].b[position],
          }),
          ...(inter.zn && {
            micro_nutrients_zinc: enters?.values[1].zn[position],
          }),
        }
        break
      case enters?.properties[2]:
        return {
          ...(inter.b && {
            micro_nutrients_boron: enters?.values[2].b[position],
          }),
          ...(inter.zn && {
            micro_nutrients_zinc: enters?.values[2].zn[position],
          }),
        }
        break
      default:
        return {} as IMicronutrientesRes
        break
    }
  }

  switch (inter.zn) {
    case BAIXO:
      return callbackMicron(0)
      break
    case MEDIO:
      return callbackMicron(1)
      break
    case ALTO:
      return callbackMicron(2)
      break
    default:
      return {}
      break
  }
}

export function PKInter({
  inter,
  calculeMatch,
  pkValues,
}: IPKInterReq): IPKInterRes {
  const calculated001 = (position: number): IPKInterRes => {
    switch (pkValues?.property) {
      case pkValues?.properties[0]:
        return {
          ...(inter.type === 'phosphor' && {
            p_phosphor_fertilizing: pkValues?.values[0][position],
          }),
          ...(inter.type === 'potassium' && {
            k_potassium_fertilizing: pkValues?.values[0][position],
          }),
        }
        break
      case pkValues?.properties[1]:
        return {
          ...(inter.type === 'phosphor' && {
            p_phosphor_fertilizing: pkValues?.values[1][position],
          }),
          ...(inter.type === 'potassium' && {
            k_potassium_fertilizing: pkValues?.values[1][position],
          }),
        }
        break
      case pkValues?.properties[2]:
        return {
          ...(inter.type === 'phosphor' && {
            p_phosphor_fertilizing: pkValues?.values[2][position],
          }),
          ...(inter.type === 'potassium' && {
            k_potassium_fertilizing: pkValues?.values[2][position],
          }),
        }
        break
      case pkValues?.properties[3]:
        return {
          ...(inter.type === 'phosphor' && {
            p_phosphor_fertilizing: pkValues?.values[3][position],
          }),
          ...(inter.type === 'potassium' && {
            k_potassium_fertilizing: pkValues?.values[3][position],
          }),
        }
        break
      default:
        return {} as IPKInterRes
        break
    }
  }

  const interCalc001 = (name: string): any => {
    switch (name) {
      case MUITOBAIXO:
        return calculated001(0)
        break
      case BAIXO:
        return calculated001(1)
        break
      case MEDIO:
        return calculated001(2)
      case ALTO:
        return calculated001(3)
        break
      case MUITOALTO:
        return calculated001(4)
        break
    }
  }

  const calculated002 = (position: number): IPKInterRes => {
    return {
      ...(inter.type === 'phosphor' && {
        p_phosphor_first_fertilizing: pkValues?.values[0][position],
        p_phosphor_second_fertilizing: pkValues?.values[1][position],
      }),
      ...(inter.type === 'potassium' && {
        k_potassium_first_fertilizing: pkValues?.values[0][position],
        k_potassium_second_fertilizing: pkValues?.values[1][position],
      }),
    }
  }

  const interCalc002 = (name: string): any => {
    switch (name) {
      case MUITOBAIXO:
        return calculated002(0)
        break
      case BAIXO:
        return calculated002(1)
        break
      case MEDIO:
        return calculated002(2)
      case ALTO:
        return calculated002(3)
        break
      case MUITOALTO:
        return calculated002(4)
        break
    }
  }

  const calculated003 = (position: number): IPKInterRes => {
    return {
      ...(inter.type === 'phosphor' && {
        p_phosphor_pre_planting_fertilizing: pkValues?.values[0][position],
      }),
      ...(inter.type === 'potassium' && {
        k_potassium_pre_planting_fertilizing: pkValues?.values[0][position],
      }),
    }
  }

  const interCalc003 = (name: string): any => {
    switch (name) {
      case MUITOBAIXO:
        return calculated003(0)
        break
      case BAIXO:
        return calculated003(1)
        break
      case MEDIO:
        return calculated003(2)
      case ALTO:
        return calculated003(3)
        break
      case MUITOALTO:
        return calculated003(4)
        break
    }
  }

  switch (calculeMatch) {
    case INTERPK001:
      return interCalc001(inter.name)
      break
    case INTERPK002:
      return interCalc002(inter.name)
      break
    case INTERPK003:
      return interCalc003(inter.name)
      break
    default:
      return {} as IPKInterRes
      break
  }
}
