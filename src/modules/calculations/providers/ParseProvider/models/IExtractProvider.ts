export default interface IExtractProvider {
  extractReport(file: string): Promise<any>
}
