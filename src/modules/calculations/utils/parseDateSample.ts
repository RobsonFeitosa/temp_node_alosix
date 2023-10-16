import { IDataSampleDTO } from '../dtos/ISamplesResponseDTO'
import Sample from '../infra/typeorm/entities/Samples'

export default class ParseDateSample {
  public convertProcess(sample: Sample): IDataSampleDTO {
    const dataSamplesPartial = {
      tb_1_clay: sample.tb_1_clay,
      tb_1_silt: sample.tb_1_silt,
      tb_1_sand: sample.tb_1_sand,
      tb_2_organic_matter: sample.tb_2_organic_matter,
      tb_2_ph: sample.tb_2_ph,
      tb_3_p_phosphor: sample.tb_3_p_phosphor,
      tb_3_k_potassium: sample.tb_3_k_potassium,
      tb_3_na_sodium: sample.tb_3_na_sodium,
      tb_3_s_sulfur: sample.tb_3_s_sulfur,
      tb_3_b_boron: sample.tb_3_b_boron,
      tb_3_cu_copper: sample.tb_3_cu_copper,
      tb_3_fe_iron: sample.tb_3_fe_iron,
      tb_3_mn_manganese: sample.tb_3_mn_manganese,
      tb_3_zn_zinc: sample.tb_3_zn_zinc,
      tb_4_ca_calcium: sample.tb_4_ca_calcium,
      tb_4_mg_magnesium: sample.tb_4_mg_magnesium,
      tb_4_al_aluminum: sample.tb_4_al_aluminum,
      tb_4_h_al_potential_acidity: sample.tb_4_h_al_potential_acidity,
      fertilizing_objective_culture: sample.fertilizing_objective_culture || '',
    }

    const { tb_1_description_deep_culture, carbon_stock_density_soil } = sample

    const dataSample = {} as IDataSampleDTO

    dataSample.tb_1_description_deep_culture = tb_1_description_deep_culture

    Object.entries(dataSamplesPartial).forEach(([key, value]) => {
      ;(dataSample as any)[key] = JSON.parse(value)
    })

    if (carbon_stock_density_soil) {
      dataSample.carbon_stock_density_soil = carbon_stock_density_soil
    }

    return dataSample
  }
}
