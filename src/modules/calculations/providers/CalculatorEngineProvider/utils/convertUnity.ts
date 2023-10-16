interface IRequest {
  unity: string
  value: number
}

export function moConvert(data: IRequest): number {
  let resPorcentagem: number

  switch (data.unity) {
    case '%':
      resPorcentagem = data.value
      break
    case 'gdm':
      resPorcentagem = data.value / 10
      break
    default:
      resPorcentagem = 0
      break
  }

  return resPorcentagem
}

export function phConvert(data: IRequest): number {
  let resH2o: number

  switch (data.unity) {
    case 'h2o':
      resH2o = data.value
      break
    case 'cacl':
      resH2o = data.value + 0.6
      break
    default:
      resH2o = 0
      break
  }

  return resH2o
}

export function convertCmol(data: IRequest): number {
  let resCmol: number

  switch (data.unity) {
    case 'cmol':
      resCmol = data.value
      break
    case 'mmol':
      resCmol = data.value / 10
      break
    case 'mgdm':
      resCmol = data.value * 0.002558
      break
    default:
      resCmol = 0
      break
  }

  return resCmol
}

export function convertMGdm(data: IRequest): number {
  let res: number

  switch (data.unity) {
    case 'mgdm':
      res = data.value
      break
    case 'cmol':
      res = data.value / 0.002558
      break
    case 'mmol':
      res = data.value * 10
      break
    default:
      res = 0
      break
  }

  return res
}

export function naSodio(data: IRequest): number {
  let resCmol: number

  switch (data.unity) {
    case 'cmol':
      resCmol = data.value
      break
    case 'mgdm':
      resCmol = data.value * 0.004348
      break
    default:
      resCmol = 0
      break
  }

  return resCmol
}
