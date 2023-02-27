import type { RegexDic, ReplacerType } from './types'
import { config } from '@/core/config'

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

    // If there are any "replacement sentences" that correspond to the language
    // described in the configuration file, replace them.
    if (
      Object.prototype.hasOwnProperty.call(haystack[key], config.language)
    ) {
      return needle.replace(
        haystack[key].pattern,
        haystack[key][config.language] as ReplacerType
      )
    }

    // If there are "replacement sentences" in English, replace them.
    if (Object.prototype.hasOwnProperty.call(haystack[key], 'en')) {
      return needle.replace(
        haystack[key].pattern,
        haystack[key].en as ReplacerType
      )
    }

    // If there is no "replacement sentences", return as is.
    return needle
  }
  return null
}
