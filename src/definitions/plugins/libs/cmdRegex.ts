/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { RegexDic } from '@/core'

export const cmdRegex: { [key: string]: RegExp } = {
  weather: /^!weather\s+(clear|rain|thunder)(\s+\w+)?\s*$/,
  timeSet: /^!time\s+set\s+(day|night)\s*$/,
  timeAdd: /^!time\s+add\s+\w+\s*$/
}

export const cmdRegexRepDic: RegexDic = {
  weather: {
    pattern: /^\[Rcon: Set the weather to (clear|rain|rain & thunder)]$/,
    ja: (message, weather) => `天気を ${weather} にしました`
  },
  timeSet: {
    pattern: /^\[Rcon: Set the time to (\w+)]$/,
    ja: (message, time) => `時刻を ${time} にしました`
  }
}
