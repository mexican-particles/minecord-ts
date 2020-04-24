import { RegexDic, RegexRepDic } from './types'

export const cmdRegex: RegexDic = {
  weather: /^\!weather\s+(clear|rain|thunder)$/,
  timeSet: /^\!time\s+set\s+(day|night)$/,
  timeAdd: /^\!time\s+add\s+\w+$/,
}

export const cmdRegexRepDic: RegexRepDic = {
  weather: [
    /^\[Rcon: Set the weather to (clear|rain|rain & thunder)]$/,
    (message, weather) => `天気を ${weather} にしました`,
  ],
  timeSet: [
    /^\[Rcon: Set the time to (\w+)]$/,
    (message, time) => `時刻を ${time} にしました`,
  ],
}
