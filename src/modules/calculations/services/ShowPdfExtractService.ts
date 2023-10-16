import { inject, injectable } from 'tsyringe'

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IExtractProvider from '../providers/ParseProvider/models/IExtractProvider'
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository'
import AppError from '@shared/errors/AppError'
import { ICreateSample } from '../dtos/ICreateSampleDTO'
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator'

interface IResponse {
  samples: ICreateSample[]
  collaborator: {
    logoUrl: string | null
    name: string
    id: string
  }
}

interface IRequest {
  files: File[]
}

@injectable()
class ShowPdfExtractService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('ExtractProvider')
    private extractProvider: IExtractProvider,

    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { files } = data

    if (files.length >= 5) {
      throw new AppError('exceeded the maximum number allowed, 5 files ')
    }

    const samples: ICreateSample[] = []

    let firstKeyExtract = ''
    let collaborator: Collaborator | undefined

    const collaboratorIds: string[] = []

    for (const file of files) {
      const filename = (file as any).filename as string

      // const fileSaved = await this.storageProvider.saveFile(filename)
      const pdfExtract = await this.extractProvider.extractReport(filename)

      firstKeyExtract = Object.keys(pdfExtract)[0]
      const keyAboutRow = '121.4400015'

      collaborator =
        await this.collaboratorRepository.findByKeyReport(firstKeyExtract)

      if (!collaborator) {
        throw new AppError('Not found collaborator')
      }

      collaboratorIds.push(collaborator.id)

      const samplesFactory = this.combineGroupLabId(pdfExtract, keyAboutRow)

      for (const sample of samplesFactory) {
        samples.push(sample)
      }
    }

    const isUniqueCollaborator = collaboratorIds.every((collaborator) =>
      collaboratorIds.includes(collaborator),
    )

    if (!isUniqueCollaborator) {
      throw new AppError('All PDF files must be from the same collaborator')
    }

    if (!collaborator) {
      throw new AppError('Not found collaborator')
    }

    return {
      collaborator: {
        id: collaborator.id,
        logoUrl: collaborator.getCollaboratorLogo(),
        name: collaborator.name,
      },
      samples,
    }
  }

  private combineGroupLabId(data: any, keyAboutRow: string) {
    const idLab = this.getIdLab(data[keyAboutRow][3].str)

    const idsLabsBuild = this.getIdsBuildReport(data, idLab)

    const samples: ICreateSample[] = []

    idsLabsBuild.forEach((idLab) => {
      samples.push(this.getReportByKey(data, idLab, keyAboutRow))
    })

    return samples
  }

  private getIdsBuildReport(data: any, iniIdLab: string): string[] {
    const idsLabBuildPrevision = Array.from({ length: 100 }, (_, i) => {
      const number = iniIdLab.slice(1, 5)
      const valueAmount = Number(number) + (i + 1)
      const txt = ['S', valueAmount].join('')
      return txt
    })

    idsLabBuildPrevision.push(iniIdLab)

    const idsLabBuild = idsLabBuildPrevision
      .filter((idslab) => {
        const item = Object.keys(data).filter((key) =>
          data[key][0].str.includes(idslab),
        )
        return item.length > 0
      })
      .map((id) => id)

    return idsLabBuild.sort()
  }

  private getReportByKey(data: any, idLab: string, keyAboutRow: string) {
    const initKeysReports = Object.keys(data)
      .filter((key) => data[key][0].str.includes(idLab))
      .map((key) => key.slice(0, 3))

    const unitsFirstTableTransformed = this.transformUnitsFirstTable(data)
    const unitsSecondTableTransformed = this.transformUnitsSecondTable(data)
    const unitsThirdTableTransformed = this.transformUnitsThirdTable(data)

    const firstRow = this.concatItemskeysIOTable(
      data,
      initKeysReports[0],
      unitsFirstTableTransformed,
    )

    const secondRow = this.concatItemskeysIOTable(
      data,
      initKeysReports[1],
      unitsSecondTableTransformed,
    )

    const thirdRow = this.concatItemskeysIOTable(
      data,
      initKeysReports[2],
      unitsThirdTableTransformed,
    )

    const about = this.aboutClientReport(data[keyAboutRow])

    const cultureDescription = this.getCultureDescription(
      data,
      initKeysReports[0],
    )

    const pMehlich = firstRow[0].value
    const sSulfur = firstRow[3].value
    const naSodium = firstRow[4].value
    const kPotassium = firstRow[5].value
    const caCalcium = firstRow[7].value
    const mgMagnesium = firstRow[8].value
    const alAluminum = firstRow[9].value
    const hALPotentialAcidity = firstRow[10].value
    const phCacl = firstRow[14].value

    const cU = secondRow[0].value
    const fE = secondRow[1].value
    const mN = secondRow[2].value
    const zN = secondRow[3].value

    const b = secondRow[9].value

    const mOS = secondRow[14].value

    const sand = thirdRow[0].value
    const silt = thirdRow[1].value
    const clay = thirdRow[2].value

    const sample: ICreateSample = {
      description_cuture: cultureDescription,
      tb_1_clay: {
        value: clay,
        unity: 'gkg',
      },
      tb_1_silt: {
        value: silt,
        unity: 'gkg',
      },
      tb_1_sand: {
        value: sand,
        unity: 'gkg',
      },
      tb_2_organic_matter: {
        value: mOS,
        unity: 'gdm',
      },
      tb_2_ph: {
        value: phCacl,
        unity: 'cacl',
      },
      tb_3_p_phosphor: {
        value: pMehlich,
        unity: 'mgdm',
      },
      tb_3_k_potassium: {
        value: kPotassium,
        unity: 'mgdm',
      },
      tb_3_na_sodium: {
        value: naSodium,
        unity: 'mgdm',
      },
      tb_3_s_sulfur: {
        value: sSulfur,
        unity: 'mgdm',
      },
      tb_3_b_boron: {
        value: b,
        unity: 'mgdm',
      },
      tb_3_cu_copper: {
        value: cU,
        unity: 'mgdm',
      },
      tb_3_fe_iron: {
        value: fE,
        unity: 'mgdm',
      },
      tb_3_mn_manganese: {
        value: mN,
        unity: 'mgdm',
      },
      tb_3_zn_zinc: {
        value: zN,
        unity: 'mgdm',
      },
      tb_4_ca_calcium: {
        value: caCalcium,
        unity: 'cmol',
      },
      tb_4_mg_magnesium: {
        value: mgMagnesium,
        unity: 'cmol',
      },
      tb_4_al_aluminum: {
        value: alAluminum,
        unity: 'cmol',
      },
      tb_4_h_al_potential_acidity: {
        value: hALPotentialAcidity,
        unity: 'cmol',
      },
      city: about.city,
      uf: about.state,
    } as ICreateSample
    return sample
  }

  private getCultureDescription(data: any, idLab: string) {
    const keysSameReport = Object.keys(data)
      .filter((key) => key.includes(idLab))
      .map((keySame) => data[keySame])

    const description = keysSameReport[0][0].str
      // eslint-disable-next-line no-useless-escape
      .match(/(?:\()[^\(\)]*?(?:\))/g)[0]
      .replace(/[{()}]/g, '')
      .replace(/'/g, '')

    return description
  }

  private aboutClientReport(dataAbout: any[]) {
    const clientName = dataAbout[0]
    const region = dataAbout[4].str
    const [city, state] = region.includes('/')
      ? region.split('/')
      : region.split('-')

    return {
      clientName,
      city,
      state,
    }
  }

  private concatItemskeysIOTable(data: any, keyReport: string, unitsItem: any) {
    const itemsFound = this.neighborskeysConcatReport(data, keyReport)
    const response: any[] = []

    Object.keys(unitsItem).forEach((unit) => {
      const unitFound = unitsItem[unit]
      const item = this.getValueXApproximate(
        unitFound.x,
        unitFound.str,
        keyReport,
        itemsFound,
      )

      response.push(item)
    })

    return response
  }

  private getIdLab(idLabGeneric: string): string {
    return idLabGeneric.slice(0, 5)
  }

  private getValueXApproximate(
    XReference: string,
    STRreference: string,
    keyYReport: string,
    itemsFound: any,
  ) {
    const keyXCurrent = String(XReference).slice(0, 3)
    const initKeyX = Number(keyXCurrent) - 12
    const initKeyXPHGException = Number(keyXCurrent) - 54
    const lastTwelveKeys = Array.from({ length: 24 }, (v, i) => i + initKeyX)
    const lastTwelveKeysPHException = Array.from(
      { length: 54 },
      (v, i) => i + initKeyXPHGException,
    )

    const itemValue = itemsFound.find((item: any) => {
      const x = String(item.x).slice(0, 3)
      return lastTwelveKeys.includes(Number(x)) || x === keyXCurrent
    })
    const itemValuePhException = itemsFound.find((item: any) => {
      const x = String(item.x).slice(0, 3)
      return lastTwelveKeysPHException.includes(Number(x)) || x === keyXCurrent
    })

    return {
      name: STRreference,
      value: Number(itemValue && itemValue.str) || 0,
      ...(STRreference === 'pH' && {
        name: STRreference,
        value: Number(itemValuePhException && itemValuePhException.str) || 0,
      }),
    }
  }

  private neighborskeysConcatReport(data: any, keyReport: string) {
    const beforeKey = Number(keyReport) - 1

    const reportPreviews = this.getkeys(data, String(beforeKey))
    const reportCurrent = this.getkeys(data, keyReport)

    const item = Array.prototype.concat(...reportCurrent, ...reportPreviews)
    item.shift()

    return item
  }

  private getkeys(data: any, keyReport: string) {
    return Object.keys(data)
      .filter((key) => key.includes(keyReport))
      .map((keySame) => data[keySame])
  }

  private transformUnitsFirstTable(data: any) {
    const keyYFistTable = Object.keys(data).find((key) => {
      const itemPosition = data[key]
      const units = [
        'P',
        'Mehlich',
        'P',
        'Resina',
        'P',
        'Reman.',
        'S',
        'Na',
        'K',
        'K',
        'Ca²',
        'Mg²',
        'Al³',
        'H + Al',
        'SB',
        'pH',
      ]
      return itemPosition.every((item: any) => units.includes(item.str))
    })

    if (!keyYFistTable) {
      return
    }

    const ctcAll = Object.keys(data).find((key) =>
      data[key].find((item: any) => item.str === 'efet.'),
    )

    if (!ctcAll) {
      return
    }

    const dataUnits = data[keyYFistTable]

    const phKeyLast = Object.keys(data)
      .filter((key) => data[key].find((item: any) => item.str === 'pH'))
      .pop()

    if (!phKeyLast) {
      return
    }

    const findPReman = Object.keys(data).find((key) =>
      data[key].find((item: any) => item.str === 'Reman.'),
    )

    const ctcItem =
      data[ctcAll].length > 1
        ? data[ctcAll]
        : [dataUnits[dataUnits.length - 1], ...data[ctcAll]]

    const phItem = data[phKeyLast]
    const itemOrigin = data[keyYFistTable]

    const initY = itemOrigin[1].y

    const initX = (elementName: string) => {
      const item = itemOrigin.find((item: any) =>
        item.str === elementName ? item.x : 0,
      )

      return (item && item.x) || 0
    }
    const secondKcmol = (elementName: string) => {
      const item = itemOrigin
        .filter((item: any) => (item.str === elementName ? item.x : 0))
        .pop()

      return (item && item.x) || 0
    }

    const newItem = {
      keyYFistTable: [
        { str: 'PMehlich', y: initY, x: initX('Mehlich') },
        {
          str: 'PResina',
          y: findPReman ? data[findPReman].y : initX('Resina'),
          x: findPReman ? data[findPReman].x : initX('Resina'),
        },
        { str: 'PReman', y: initY, x: initX('Reman.') },
        { str: 'S', y: initY, x: initX('S') },
        { str: 'Na', y: initY, x: initX('Na') },
        { str: 'K', y: initY, x: initX('K') },
        { str: 'K', y: initY, x: secondKcmol('K') },
        { str: 'Ca²', y: initY, x: initX('Ca²') },
        { str: 'Mg²', y: initY, x: initX('Mg²') },
        { str: 'Al³', y: initY, x: initX('Al³') },
        { str: 'H + Al', y: initY, x: initX('H + Al') },
        { str: 'SB', y: initY, x: initX('SB') },
        { str: 'CTCPh', y: initY, x: ctcItem[0].x },
        { str: 'CTCefet', y: initY, x: ctcItem[1].x },
        { str: 'pH', y: initY, x: phItem[0].x },
      ],
    }

    return newItem.keyYFistTable
  }

  private transformUnitsSecondTable(data: any) {
    const keyYSecondTable = Object.keys(data).find((key) => {
      const itemPosition = data[key]
      const units = ['Cu', 'Fe', 'Mn', 'Zn', 'Mo', 'Cl', 'Co', 'Si', 'CE']
      return itemPosition.every((item: any) => units.includes(item.str))
    })

    if (!keyYSecondTable) {
      return
    }

    const keyShortTable = keyYSecondTable.slice(0, 3)

    const dataKeysUnits = Object.keys(data).filter((key) =>
      key.includes(keyShortTable),
    )
    const keysArray = dataKeysUnits.map((item) =>
      data[String(item)].map((i: any) => i),
    )
    const unitsData: { str: string; y: string; x: string }[] = [].concat(
      ...keysArray,
    )

    return unitsData
  }

  private transformUnitsThirdTable(data: any) {
    const keyYThirdTable = Object.keys(data).find((key) => {
      const itemPosition = data[key]
      const units = ['Areia', 'Silte', 'Argila']
      return itemPosition.some((item: any) => units.includes(item.str))
    })

    if (!keyYThirdTable) {
      return
    }

    const keyShortTable = keyYThirdTable.slice(0, 3)

    const dataKeysUnits = Object.keys(data).filter((key) =>
      key.includes(keyShortTable),
    )

    const keysArray = dataKeysUnits.map((item) =>
      data[String(item)].map((i: any) => i),
    )
    const unitsData: { str: string; y: string; x: string }[] = [].concat(
      ...keysArray,
    )

    return { sand: unitsData[9], silt: unitsData[10], clay: unitsData[11] }
  }
}

export default ShowPdfExtractService
