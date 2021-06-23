import { loadDictionary } from '@/dictionary/loadDictionary'
import { replaceWithRegexDic } from '@/dictionary/replaceWithRegexDic'
import type { RegexDic } from '@/dictionary/types'

export class DictionaryList {
  private readonly list: RegexDic[]

  constructor() {
    this.list = loadDictionary()
  }

  replace(needle: string): string | null {
    for (const key in this.list) {
      if (!Object.prototype.hasOwnProperty.call(this.list, key)) {
        continue
      }
      const replacedOrNull: string | null = replaceWithRegexDic(
        needle,
        this.list[key]
      )
      if (replacedOrNull !== null) {
        return replacedOrNull
      }
    }
    return null
  }
}
