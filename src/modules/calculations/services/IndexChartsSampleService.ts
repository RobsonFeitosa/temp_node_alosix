import { injectable, inject } from 'tsyringe'

import ISampleRepository from '../repositories/ISampleRepository'

interface IPromiseSample {
  [key: string]: number
}

@injectable()
class IndexChartsSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,
  ) {}

  public async execute(): Promise<IPromiseSample[]> {
    const dataSamples = await this.sampleRepository.findChart()

    const groups = dataSamples.reduce(
      // eslint-disable-next-line no-shadow
      (group: any, sample: any) => {
        const date = sample.created_at.toLocaleDateString('pt-BR')
        if (!group[date]) {
          // eslint-disable-next-line no-param-reassign
          group[date] = []
        }
        group[date].push(sample.created_at)
        return group
      },
      {},
    )

    const groupArrays = Object.keys(groups).map((date) => {
      const x: any = []
      const a = Date.parse(groups[date][0])
      const s = groups[date].length
      x.push(a, s)
      return x
    })

    return groupArrays
  }
}

export default IndexChartsSampleService
