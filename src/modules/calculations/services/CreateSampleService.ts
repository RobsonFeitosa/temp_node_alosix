import { inject, injectable } from 'tsyringe'
import { ICreateSample } from '../dtos/ICreateSampleDTO'
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO'

import Samples from '../infra/typeorm/entities/Samples'

import ICalculatorProvider from '../providers/CalculatorEngineProvider/models/ICalculatorProvider'
import ISampleCalculatedRepository from '../repositories/ISampleCalculatedRepository'

import ISampleRepository from '../repositories/ISampleRepository'
import ParseDateSample from '../utils/parseDateSample'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUserSettingsRepository from '@modules/users/repositories/IUserSettingsRepository'

interface Request {
  user_id: string
  dataSamples: ICreateSample[]
}

type ISavedSamples = Omit<
  Samples,
  'deleted_at' | 'id' | 'created_at' | 'updated_at' | 'user' | 'fertilizing'
>

@injectable()
class CreateSampleService {
  constructor(
    @inject('SampleRepository')
    private sampleRepository: ISampleRepository,

    @inject('CalculatorProvider')
    private calculatorProvider: ICalculatorProvider,

    @inject('SampleCalculatedRepository')
    private sampleCalculatedRepository: ISampleCalculatedRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,
  ) {}

  public async execute({
    user_id,
    dataSamples,
  }: Request): Promise<ISamplesResponseDTO[]> {
    const samplesSave: ISavedSamples[] = []

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    const calculates = dataSamples[0].calculate

    /// /
    // Separate data for save, calculated and interpratation
    //
    dataSamples.forEach((repor, index) => {
      samplesSave.push({
        user_id,
        description_cuture: repor.description_cuture,
        tb_1_description_deep_culture: repor.tb_1_description_deep_culture,
        tb_1_clay: JSON.stringify({
          value: repor.tb_1_clay.value,
          unity: repor.tb_1_clay.unity,
        }),
        tb_1_silt: JSON.stringify({
          value: repor.tb_1_silt.value,
          unity: repor.tb_1_silt.unity,
        }),
        tb_1_sand: JSON.stringify({
          value: repor.tb_1_sand.value,
          unity: repor.tb_1_sand.unity,
        }),
        tb_2_organic_matter: JSON.stringify({
          value: repor.tb_2_organic_matter.value,
          unity: repor.tb_2_organic_matter.unity,
        }),
        tb_2_ph: JSON.stringify({
          value: repor.tb_2_ph.value,
          unity: repor.tb_2_ph.unity,
        }),
        tb_3_na_sodium: JSON.stringify({
          value: repor.tb_3_na_sodium.value,
          unity: repor.tb_3_na_sodium.unity,
        }),
        tb_3_p_phosphor: JSON.stringify({
          value: repor.tb_3_p_phosphor.value,
          unity: repor.tb_3_p_phosphor.unity,
        }),
        tb_3_k_potassium: JSON.stringify({
          value: repor.tb_3_k_potassium.value,
          unity: repor.tb_3_k_potassium.unity,
        }),
        tb_3_s_sulfur: JSON.stringify({
          value: repor.tb_3_s_sulfur.value,
          unity: repor.tb_3_s_sulfur.unity,
        }),
        tb_3_b_boron: JSON.stringify({
          value: repor.tb_3_b_boron.value,
          unity: repor.tb_3_b_boron.unity,
        }),
        tb_3_cu_copper: JSON.stringify({
          value: repor.tb_3_cu_copper.value,
          unity: repor.tb_3_cu_copper.unity,
        }),
        tb_3_fe_iron: JSON.stringify({
          value: repor.tb_3_fe_iron.value,
          unity: repor.tb_3_fe_iron.unity,
        }),
        tb_3_mn_manganese: JSON.stringify({
          value: repor.tb_3_mn_manganese.value,
          unity: repor.tb_3_mn_manganese.unity,
        }),
        tb_3_zn_zinc: JSON.stringify({
          value: repor.tb_3_zn_zinc.value,
          unity: repor.tb_3_zn_zinc.unity,
        }),
        tb_4_ca_calcium: JSON.stringify({
          value: repor.tb_4_ca_calcium.value,
          unity: repor.tb_4_ca_calcium.unity,
        }),
        tb_4_mg_magnesium: JSON.stringify({
          value: repor.tb_4_mg_magnesium.value,
          unity: repor.tb_4_mg_magnesium.unity,
        }),
        tb_4_al_aluminum: JSON.stringify({
          value: repor.tb_4_al_aluminum.value,
          unity: repor.tb_4_al_aluminum.unity,
        }),
        tb_4_h_al_potential_acidity: JSON.stringify({
          value: repor.tb_4_h_al_potential_acidity.value,
          unity: repor.tb_4_h_al_potential_acidity.unity,
        }),
        fertilizing_objective_culture: JSON.stringify(
          repor.fertilizing_objective_culture,
        ),
        carbon_stock_density_soil: repor.carbon_stock_density_soil,
        city: repor.city,
        uf: repor.uf,
      })
    })

    /// /
    // Save
    //
    const createdSample = await this.sampleRepository.create(samplesSave)

    /// /
    // Create Report
    //
    const samplesReport: ISamplesResponseDTO[] = []

    createdSample.forEach((sample, index) => {
      /// /
      // Engine Calculate and interpratation
      //
      const calculationsSample_ = this.calculatorProvider.calculatorEngine(
        sample,
        calculates,
      )

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
        ...calculationsSample_,
        city,
        uf,
        created_at,
        updated_at,
      }

      samplesReport[index] = { ...report }
    })

    if (user?.settings.is_first_calculation) {
      this.savedFirstCalculation(user)
    }

    /// /
    // Save Sample Calculated
    //
    const sampleCalculatedBuild = samplesReport.map((sample) => {
      return {
        sample_id: sample.id,
        calculation: JSON.stringify(sample.calculations_),
        interpretation: JSON.stringify(sample.interpretation_),
      }
    })
    await this.sampleCalculatedRepository.create(sampleCalculatedBuild)

    return samplesReport
  }

  private async savedFirstCalculation(user: User): Promise<void> {
    if (user) {
      user.settings.is_first_calculation = false

      await this.userSettingsRepository.save(user.settings)
    }
  }
}

export default CreateSampleService
