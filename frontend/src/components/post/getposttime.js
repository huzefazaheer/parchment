export default function postTime(timeMs) {
  let seconds = Math.floor(timeMs / 1000)

  if (seconds < 60) return seconds + ' s'

  let minutes = Math.floor(seconds / 60)
  if (minutes < 60) return minutes + ' m'

  let hours = Math.floor(minutes / 60)
  if (hours < 24) return hours + ' h'

  let days = Math.floor(hours / 24)
  if (days < 30) return days + ' d'

  let months = Math.floor(days / 30)
  if (months < 12) return months + ' M'

  let years = Math.floor(months / 12)
  return years + ' Y'
}
