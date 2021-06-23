import config from '@/config/config'
import type { RegexDic, ReplacerType } from '@/dictionary/types'

export const replaceWithRegexDic = (
  needle: string,
  haystack: RegexDic
): string | null => {
  for (const key in haystack) {
    if (!Object.prototype.hasOwnProperty.call(haystack, key)) {
      continue
    }
    if (!haystack[key].pattern.test(needle)) {
      continue
    }

    // 設定ファイルに記述された言語の置換文章があったら置換する
    if (
      Object.prototype.hasOwnProperty.call(haystack[key], config().language)
    ) {
      return needle.replace(
        haystack[key].pattern,
        haystack[key][config().language] as ReplacerType
      )
    }

    // 英語の置換文章があったら置換する
    if (Object.prototype.hasOwnProperty.call(haystack[key], 'en')) {
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
