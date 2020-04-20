import { RegexDic } from './types'

export const whiteListRegex: RegexDic = {
  add: /^\[(.*):\sAdded\s(.*)\sto\sthe\swhitelist]$/,
  remove: /^\[(.*):\sRemoved\s(.*)\sfrom\sthe\swhitelist]$/,
}
