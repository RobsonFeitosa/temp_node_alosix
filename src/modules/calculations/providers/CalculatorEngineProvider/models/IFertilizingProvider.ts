import {
  IFertilizingResponseDTO,
  IFertilizingCreateDTO,
} from '../dtos/FertilizingDTO'

interface IRequestFertilizingCalculator extends IFertilizingCreateDTO {
  _clayContent: number
}

export default interface IFertilizingProvider {
  fertilizingCalculator(
    data: IRequestFertilizingCalculator,
  ): IFertilizingResponseDTO[]
}
