const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/

export default function getLink(text) {
  const links = text.match(urlRegex)
  if (links != null) return links[0]
  return links
}

export function removeLinks(text) {
  return text.replace(urlRegex, '').trim()
}
