'use strict'

import { PdfReader } from 'pdfreader'
import parse from './parse'

export default class Parser {
  private reader: any

  constructor() {
    this.reader = new PdfReader(null)
  }

  async parse(buffer: any) {
    try {
      const data = await parse(buffer, this.reader)
      const outputString = JSON.stringify(data, null, 2)

      return outputString
    } catch (err) {
      console.error(err)
    }
  }
}
