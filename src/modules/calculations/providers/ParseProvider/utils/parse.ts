import { PdfReader } from 'pdfreader'

function readPDFPages(buffer: any, reader = new PdfReader(null)) {
  return new Promise((resolve, reject) => {
    const pages: any[] = []
    reader.parseBuffer(buffer, (err, item) => {
      if (err) reject(err)
      else if (!item) resolve(pages)
      else if (item.page) pages.push({})
      else if (item.text) {
        const row = pages[pages.length - 1][item.height || 0] || []
        row.push(item.text)
        pages[pages.length - 1][item.height || 0] = row
      }
    })
  })
}

function parseToddPDF(pages: any[]) {
  const page = pages[0] // We know there's only going to be one page

  // Declarative map of PDF data that we expect, based on Todd's structure
  const fields: any = {
    date: { row: '41.28', index: 0 },
  }

  const data: any = {}

  // console.log('parse4', page)
  // Assign the page data to an object we can return, as per
  // our field specification
  Object.keys(fields).forEach((key) => {
    const field = fields[key]
    const val = page[field.row][field.index]

    // We don't want to lose leading zeros here, and can trust
    // any backend / data handling to worry about that. This is
    // why we don't coerce to Number.
    data[key] = val
  })

  // Manually fixing up some text fields so theyre usable
  // data.reqID = data.reqID.slice('Requsition ID: '.length);
  // data.date = data.date.slice('Date: '.length);

  return data
}

export default async function parse(buf: any, reader: any) {
  const data = (await readPDFPages(buf, reader)) as any[]
  // console.log({'beforeParse': data});
  const parsedData = parseToddPDF(data)
  // return data;
  return parsedData
}
