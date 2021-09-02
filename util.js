export function getArgs (text = '') {
  const split = text.split(/\s+/gi).filter(Boolean)
  return split.length ? split.slice(1) : split
}
