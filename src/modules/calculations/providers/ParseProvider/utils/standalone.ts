import Parser from './parser'

const parser = new Parser()

process.stdin
  .pipe(parser)
  .on('finish', () => process.exit(0))
  .on('error', () => process.exit(1))
