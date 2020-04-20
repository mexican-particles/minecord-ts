import { RegexDic } from './types'

export const serverRegex: RegexDic = {
  stopping: /^Stopping\sserver$/,
  starting: /^Starting\sminecraft\sserver\sversion\s.*$/,
  ready: /^Done\s\(.*s\)!\sFor\shelp,\stype\s"help"\sor\s"\?"$/,
}
