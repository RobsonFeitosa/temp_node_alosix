import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO'
import { IUpdateSample } from '../dtos/IUpdateSampleDTO'
import SampleCalculated from '../infra/typeorm/entities/SampleCalculated'

import Samples from '../infra/typeorm/entities/Samples'
import { IObjectiveCulture } from '../providers/CalculatorEngineProvider/dtos/FertilizingDTO'
import { ICalculatorResponseDTO } from '../providers/CalculatorEngineProvider/dtos/ICalculatorDTO'
import ICalculatorProvider from '../providers/CalculatorEngineProvider/models/ICalculatorProvider'
import ISampleCalculatedRepository from '../repositories/ISampleCalculatedRepository'
import ISampleRepository from '../repositories/ISampleRepository'
import ParseDateSample from '../utils/parseDateSample'

interface RequestDTO {
  sampleId: string
  dataSample: IUpdateSample
}

@injectable()
class UpdateAddingCalculationsSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('SampleCalculatedRepository')
    private sampleCalculatedRepository: ISampleCalculatedRepository,

    @inject('CalculatorProvider')
    private calculatorProvider: ICalculatorProvider,
  ) {}

  public async execute({
    sampleId,
    dataSample,
  }: RequestDTO): Promise<ISamplesResponseDTO> {
    const sample = await this.sampleRepository.findById(sampleId)

    if (!sample) {
      throw new AppError('Sample not found')
    }

    const sampleUpdated: Samples = { ...sample }

    const requestFertilizingObjective: IObjectiveCulture[] =
      dataSample.fertilizing_objective_culture
    const newObjectiveCultures = this.getObjectiveCultureExclusive(
      sample,
      requestFertilizingObjective,
    )

    sampleUpdated.fertilizing_objective_culture =
      JSON.stringify(newObjectiveCultures)

    const [updatedSample] = await this.sampleRepository.save([sampleUpdated])

    const sampleCalculated =
      await this.sampleCalculatedRepository.findBySampleId(sample.id)

    if (!sampleCalculated) {
      throw new AppError('Sample calculated not found')
    }

    const calculateAllOptions = await this.getAllCalculations(
      sampleCalculated,
      dataSample.calculate,
    )

    const allCalculations = this.uniqueCalculations(calculateAllOptions)

    const calculationsSample: ICalculatorResponseDTO =
      this.calculatorProvider.calculatorEngine(updatedSample, allCalculations)

    await this.sampleCalculatedRepository.save({
      ...sampleCalculated,
      ...{
        calculation: JSON.stringify(calculationsSample.calculations_),
      },
    })

    const report = this.getReportSample(
      updatedSample,
      calculationsSample.calculations_,
    )

    return report
  }

  private async getAllCalculations(
    sampleCalculated: SampleCalculated,
    dataCalculate: string[],
  ): Promise<string[]> {
    const calculations: any = JSON.parse(sampleCalculated.calculation)

    const ignoreCalculations = ['generic']
    const calculationsNames = []

    for (const calculation in calculations) {
      if (
        !ignoreCalculations.includes(calculation) &&
        calculations[calculation] !== null
      ) {
        calculationsNames.push(calculation)
      }
    }

    const allCalculations = calculationsNames.concat(dataCalculate)

    return allCalculations
  }

  private uniqueCalculations(calculationis: string[]): string[] {
    return calculationis.filter((element, index) => {
      return calculationis.indexOf(element) === index
    })
  }

  private getObjectiveCultureExclusive(
    sample: Samples,
    targetOjectiveCulture: IObjectiveCulture[],
  ) {
    let objectiveCultures: IObjectiveCulture[] = []

    if (sample.fertilizing_objective_culture) {
      const culturesSample: IObjectiveCulture[] = JSON.parse(
        sample.fertilizing_objective_culture,
      )
      objectiveCultures = [...culturesSample]

      targetOjectiveCulture.forEach((objectiveCulture) => {
        const hasCulture = culturesSample
          .map((fo) => fo.culture)
          .includes(objectiveCulture.culture)

        if (!hasCulture) {
          objectiveCultures.push(objectiveCulture)
        }
      })
    }

    return objectiveCultures
  }

  private getReportSample(sample: any, calculations: any) {
    const parseDateSample = new ParseDateSample()

    const {
      id,
      user_id,
      description_cuture,
      city,
      uf,
      created_at,
      updated_at,
    } = sample

    const report = {
      id,
      user_id,
      description_cuture,
      ...{ data_sample: parseDateSample.convertProcess(sample) },
      ...calculations,
      city,
      uf,
      created_at,
      updated_at,
    }

    return report
  }
}

export default UpdateAddingCalculationsSampleService
