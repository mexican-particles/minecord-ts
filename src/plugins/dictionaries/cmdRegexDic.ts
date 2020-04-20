type RegexDic = { [key: string]: RegExp }

export const cmdRegexDic: RegexDic = {
  weather: /^\!weather\s+(clear|rain|thunder)$/
}
