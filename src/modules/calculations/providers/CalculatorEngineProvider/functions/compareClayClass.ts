export function compareClayClass(clay: number): string {
  switch (true) {
    case clay <= 20:
      return '4'
      break
    default:
      return '1-2-3'
      break
  }
}
