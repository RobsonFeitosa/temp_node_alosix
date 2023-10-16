import Sample from '@modules/calculations/infra/typeorm/entities/Samples'
import { ICalculatorResponseDTO } from '../dtos/ICalculatorDTO'

export default interface ICalculatorProvider {
  calculatorEngine(sample: Sample, calculate?: string[]): ICalculatorResponseDTO
}
