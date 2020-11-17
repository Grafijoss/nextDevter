import { useEffect, useState } from 'react'
import { formatDate } from './useDateTimeFormat'

// Intl internacionalizacion global existe
const isRelativeTimeFormatSupported =
  typeof Intl !== 'undefined' && Intl.RelativeTimeFormat

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
      const value = Math.floor(elapsed / seconsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  // if we pass a method to useEffect just will execute the first time
  // it is better to pass a function and not the execution of the function
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    if (!isRelativeTimeFormatSupported) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp)
        setTimeAgo(newTimeAgo)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [timestamp])

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp)
  }

  // relative time format
  const rtf = new Intl.RelativeTimeFormat('es', { style: 'long' }) // short, narrow, long
  // format recives two parameters val and unit

  const { value, unit } = timeAgo
  return rtf.format(value, unit)
}
