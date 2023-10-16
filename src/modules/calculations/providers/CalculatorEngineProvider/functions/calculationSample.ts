import {
  somaDeBasesDTO,
  ctcefDTO,
  ctcph7DTO,
  mSaturacaoAluminioDTO,
  vSaturacaoBasesDTO,
  ncph7DTO,
  ncph7prnt7DTO,
  ngDTO,
  ncph6DTO,
} from '../dtos/FormulaSample'

interface IUnity {
  unity: string
  value: number
}

function responseDensidadeSolo(value: string): number {
  switch (value) {
    case '0.5 a 1.1':
      return 0.8
      break
    case '1.2 a 1.5':
      return 1.35
      break
    case '1.6 a 1.8':
      return 1.7
      break
    case '1.9 a 2.0':
      return 1.95
      break
    default:
      return 0
      break
  }
}

function moConvertCot(data: IUnity): number {
  let res: number

  switch (data.unity) {
    case '%':
      res = (data.value * 10) / 1.724
      break
    case 'gdm':
      res = data.value / 1.724
      break
    default:
      res = 0
      break
  }

  return res
}

export function cot(data: { mo: IUnity; deep: string; ds: string }): number {
  const { mo, deep, ds } = data

  const cotV = moConvertCot(mo)

  const deepValue = deep.split('a')[1]
  const deepV = Number(deepValue) / 100

  const dsV = responseDensidadeSolo(ds)

  const ps1 = dsV * cotV * deepV * 100 * 100

  const amount = Number((ps1 / 1000).toFixed(2))

  return amount
}

export function somaDeBasesCalc(data: somaDeBasesDTO): number {
  const { ca, mg } = data

  const k = data.k ? data.k : 0
  const na = data.na ? data.na : 0

  const amount = Number((k + na + ca + mg).toFixed(2))

  return amount
}

export function ctcefCalc(data: ctcefDTO): number {
  const { ca, mg, al } = data

  const k = data.k ? data.k : 0
  const na = data.na ? data.na : 0

  const amount = Number((k + na + ca + mg + al).toFixed(2))

  return amount
}

export function ctcph7Calc(data: ctcph7DTO): number {
  const { ca, mg, h_al } = data

  const k = data.k ? data.k : 0
  const na = data.na ? data.na : 0

  const amount = Number((k + na + ca + mg + h_al).toFixed(2))

  return amount
}

export function mSaturacaoAluminioCalc(data: mSaturacaoAluminioDTO): number {
  const { ctcef, al } = data

  const amount = Number(((al * 100) / ctcef).toFixed(2))

  return amount
}

export function vSaturacaoBasesCalc(data: vSaturacaoBasesDTO): number {
  const { ctcph, sb } = data

  const amount = Number(((sb * 100) / ctcph).toFixed(2))

  return amount
}

export function ncph6Calc(data: ncph7DTO): number {
  const { mo, al } = data

  const amount = Number((-0.516 + 0.805 * mo + 2.435 * al).toFixed(2))

  return amount
}

export function ncph7Calc(data: ncph6DTO): number {
  const { ctcph7, prnt, s_sb } = data

  const amount = Number(((ctcph7 * (90 - s_sb)) / prnt).toFixed(2))

  return amount
}

export function ncph7prnt7Calc(data: ncph7prnt7DTO): number {
  const { ncph7, prnt } = data

  const amount = Number(((ncph7 * 100) / prnt).toFixed(2))

  return amount
}

export function ngCalc(data: ngDTO): number {
  const { ca, ctcef } = data

  const amount = Number(((0.6 * ctcef - ca) * 6.4).toFixed(2))

  return amount
}
