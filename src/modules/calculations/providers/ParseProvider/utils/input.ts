export default function getTerminalInput(subArrays: number) {
  return new Promise((resolve) => {
    const output: any[] = []
    if (process.stdin.isTTY) {
      const input = process.argv.slice(2)

      const len = Math.min(subArrays, Math.ceil(input.length / subArrays))

      while (input.length) {
        output.push(input.splice(0, len))
      }

      resolve(output)
    } else {
      let input = ''
      process.stdin.setEncoding('utf-8')

      process.stdin.on('readable', () => {
        let chunk
        while ((chunk = process.stdin.read())) input += chunk
      })

      process.stdin.on('end', () => {
        input = input.trim().split('\n')[0]

        const len = Math.min(input.length, Math.ceil(input.length / subArrays))

        while (input.length) {
          output.push(input.slice(0, len))
        }

        resolve(output)
      })
    }
  })
}
