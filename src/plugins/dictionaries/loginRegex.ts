import { RegexDic } from './types'

export const loginRegex: RegexDic = {
  login: /^([\w\d_]+)\[.*] logged\sin\swith\sentity\sid\s\w+\sat\s\(.*\).*$/,
  logout: /^([\w\d_]+)\sleft\sthe\sgame$/,
}
