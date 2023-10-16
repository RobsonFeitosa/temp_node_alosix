import {
  IInterpretationCreateDTO,
  IInterpretationResponseDTO,
} from '../dtos/IInterpretationDTO'

export default interface IInterpratationProvider {
  interpratationCalculator(
    data: IInterpretationCreateDTO,
  ): IInterpretationResponseDTO
}
