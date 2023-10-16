import { injectable } from 'tsyringe'
import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract'
import uploadConfig from '@config/upload'
import path from 'path'

import IExtractProvider from '../models/IExtractProvider'

@injectable()
export default class ExtractProvider implements IExtractProvider {
  public async extractReport(file: string): Promise<any> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)

    const pdfExtract = new PDFExtract()
    const options: PDFExtractOptions = {}

    const pdf = await pdfExtract.extract(originalPath, options)

    const pagesData = pdf.pages[0].content

    const groupedObject = pagesData.reduce((result, currentValue) => {
      const y = currentValue.y

      if (currentValue.str !== ' ' && currentValue.str !== '') {
        if (result[y]) {
          const strPosition = {
            str: currentValue.str,
            y: currentValue.y,
            x: currentValue.x,
          }
          result[y].push(strPosition)
        } else {
          const strPosition = {
            str: currentValue.str,
            y: currentValue.y,
            x: currentValue.x,
          }
          result[y] = [strPosition]
        }
      }
      return result
    }, {} as any)

    return groupedObject
  }
}
