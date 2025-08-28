export default function truncateWords(text, maxWords) {
  const words = text.split(/\s+/)
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...'
  }
  return text
}
