const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, seconsInUnit] of DATE_UNITS) {
    // desustructuracion - destructuring
    if (Math.abs(elapsed) > seconsInUnit || unit === 'second') {
      // Math.abs nos retorna el valor absoluto
      const value = Math.round(elapsed / seconsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const { value, unit } = getDateDiffs(timestamp)
  // relative time format
  const rtf = new Intl.RelativeTimeFormat('es', { style: 'long' }) // short, narrow, long
  // format recives two parameters val and unit
  console.log(value, unit)
  return rtf.format(value, unit)
}
