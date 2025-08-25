export default function commentTime(timeMs) {
  let seconds = Math.round(timeMs / 1000)

  if (seconds < 60) return seconds + 's'

  let minutes = Math.round(seconds / 60)
  if (minutes < 60) return minutes + 'm'

  let hours = Math.round(minutes / 60)
  if (hours < 24) return hours + 'h'

  let days = Math.round(hours / 24)
  if (days < 30) return days + 'd'

  let months = Math.round(days / 30)
  if (months < 12) return months + 'M'

  let years = Math.round(months / 12)
  return years + 'Y'
}
