interface ICalculationsOptions {
  calculation_option: string
  value: string | null
}
export interface IOPTCalculations {
  calculations: {
    names: string[]
    fertilizing?: ICalculationsOptions[]
    stock_carbon?: ICalculationsOptions
  }
}
export default interface ICreateOrderDTO {
  user_id: string
  cod_order: string
  calculate_options: IOPTCalculations | null
}
