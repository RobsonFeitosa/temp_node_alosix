import { IObjectiveCulture } from '../providers/CalculatorEngineProvider/dtos/FertilizingDTO'

export interface IUpdateSample {
  calculate: Array<'liming' | 'plaster' | 'fertilizing' | 'carbon_stock'>
  fertilizing_objective_culture: IObjectiveCulture[]
  carbon_stock_density_soil: string
}
