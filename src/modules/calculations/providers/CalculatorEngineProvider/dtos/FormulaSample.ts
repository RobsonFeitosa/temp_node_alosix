export interface somaDeBasesDTO {
  k?: number
  na?: number
  ca: number
  mg: number
}

export interface ctcefDTO {
  k?: number
  na?: number
  ca: number
  mg: number
  al: number
}

export interface ctcph7DTO {
  k?: number
  na?: number
  ca: number
  mg: number
  h_al: number
}

export interface mSaturacaoAluminioDTO {
  al: number
  ctcef: number
}

export interface vSaturacaoBasesDTO {
  sb: number
  ctcph: number
}

export interface ncph6DTO {
  ctcph7: number
  s_sb: number
  prnt: number
}

export interface ncph7DTO {
  mo: number
  al: number
}

export interface ncph7prnt7DTO {
  ncph7: number
  prnt: number
}

export interface ngDTO {
  ca: number
  ctcef: number
}
