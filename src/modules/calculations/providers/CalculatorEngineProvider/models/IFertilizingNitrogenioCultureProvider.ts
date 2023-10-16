import { nitrogenioculture_beforeDTO } from '../dtos/FertilizingDTO'

export default interface IFertilizingNitrogenioCultureProvider {
  extend_nitrogenio_milho({
    culture_before,
    mo,
  }: nitrogenioculture_beforeDTO): string
}
