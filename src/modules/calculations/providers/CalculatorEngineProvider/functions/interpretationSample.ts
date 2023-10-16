import { INTERPRETATION_VALUES } from '../config/interpretationValues'

const { MUITOBAIXO, BAIXO, MEDIO, ALTO, MUITOALTO } = INTERPRETATION_VALUES

export function ClayInter(value: number): string {
  let classe: string

  switch (true) {
    case value <= 20:
      classe = 'classe 4'
      break
    case value <= 40:
      classe = 'classe 3'
      break
    case value <= 60:
      classe = 'classe 2'
      break
    case value < 99999999:
      classe = 'classe 1'
      break
    default:
      classe = 'classe 0'
      break
  }

  return classe
}

export function pHInter(value: number): string {
  let res: string

  switch (true) {
    case value <= 5:
      res = MUITOBAIXO
      break
    case value <= 5.4:
      res = BAIXO
      break
    case value <= 6:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function pPhosphorMelichInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value <= 5:
      res = MUITOBAIXO
      break
    case value <= 10:
      res = BAIXO
      break
    case value <= 20:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function kPotassiumInter({
  ctcph7,
  k = 12,
}: {
  ctcph7: number
  k: number
}): string {
  let res: string

  switch (true) {
    case ctcph7 <= 5:
      switch (true) {
        case k < 0:
          res = 'not-exist'
          break
        case k <= 15:
          res = MUITOBAIXO
          break
        case k <= 30:
          res = BAIXO
          break
        case k <= 45:
          res = MEDIO
          break
        case k <= 90:
          res = ALTO
          break
        case k < 99999999:
          res = MUITOALTO
          break
        default:
          res = ''
          break
      }
      break
    case ctcph7 <= 15:
      switch (true) {
        case k < 0:
          res = 'not-exist'
          break
        case k <= 20:
          res = MUITOBAIXO
          break
        case k <= 40:
          res = BAIXO
          break
        case k <= 60:
          res = MEDIO
          break
        case k <= 120:
          res = ALTO
          break
        case k < 99999999:
          res = MUITOALTO
          break
        default:
          res = ''
          break
      }
      break
    case ctcph7 < 99999999:
      switch (true) {
        case k < 0:
          res = 'not-exist'
          break
        case k <= 30:
          res = MUITOBAIXO
          break
        case k <= 60:
          res = BAIXO
          break
        case k <= 90:
          res = MEDIO
          break
        case k <= 180:
          res = ALTO
          break
        case k < 99999999:
          res = MUITOALTO
          break
        default:
          res = ''
          break
      }
      break
    default:
      res = ''
      break
  }

  return res
}

export function sSulfurInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value <= 2:
      res = BAIXO
      break
    case value <= 5:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function bBoronInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value < 0.1:
      res = BAIXO
      break
    case value <= 0.3:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function cuCopperInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value < 0.2:
      res = BAIXO
      break
    case value <= 0.4:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function feIronInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function mnManganeseaInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value < 2.5:
      res = BAIXO
      break
    case value <= 5:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function znZincInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value < 0.2:
      res = BAIXO
      break
    case value <= 0.5:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function caCalciumInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value <= 2:
      res = BAIXO
      break
    case value <= 4:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
      break
    default:
      res = ''
      break
  }

  return res
}

export function mgMagnesiumInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value <= 0.5:
      res = BAIXO
      break
    case value <= 1:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function ctcph7Inter(value: number): string {
  let res: string

  switch (true) {
    case value <= 5:
      res = BAIXO
      break
    case value <= 15:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function mAluminumSaturationInter(value: number): string {
  let res: string

  switch (true) {
    case value < 0:
      res = 'not-exist'
      break
    case value < 1:
      res = MUITOBAIXO
      break
    case value <= 10:
      res = BAIXO
      break
    case value <= 20:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}

export function vBaseSaturationInter(value: number): string {
  let res: string

  switch (true) {
    case value < 45:
      res = MUITOBAIXO
      break
    case value <= 64:
      res = BAIXO
      break
    case value <= 80:
      res = MEDIO
      break
    case value < 99999999:
      res = ALTO
      break
    default:
      res = ''
      break
  }

  return res
}
