export type ReplacerType = (substring: string, ...args: any[]) => string

export type RegexDic = {
  [key: string]: {
    pattern: RegExp
    ja?: ReplacerType
    en?: ReplacerType
  }
}
