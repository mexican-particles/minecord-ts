import config from '@/config'

type ReplacerType = (substring: string, ...args: any[]) => string

export type RegexDic = {
  [key: string]: {
    pattern: RegExp
    ja?: ReplacerType
    en?: ReplacerType
  }
}

export const replaceWithRegexDic = (
  needle: string,
  haystack: RegexDic
): string | null => {
  for (const key in haystack) {
    if (!haystack.hasOwnProperty(key)) {
      continue
    }
    if (!haystack[key].pattern.test(needle)) {
      continue
    }

    // 設定ファイルに記述された言語の置換文章があったら置換する
    if (haystack[key].hasOwnProperty(config().language)) {
      return needle.replace(
        haystack[key].pattern,
        haystack[key][config().language] as ReplacerType
      )
    }

    // 英語の置換文章があったら置換する
    if (haystack[key].hasOwnProperty('en')) {
      return needle.replace(
        haystack[key].pattern,
        haystack[key].en as ReplacerType
      )
    }

    // 置換先がない場合はそのまま返す
    return needle
  }
  return null
}
