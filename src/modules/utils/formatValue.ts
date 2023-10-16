const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-Br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

export default formatValue

export const formatValueForHundred = (value: number): string => {
  const reduceValue = value / 100
  return formatValue(reduceValue)
}
