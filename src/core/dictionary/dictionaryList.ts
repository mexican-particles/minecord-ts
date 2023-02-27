import { replaceWithRegexDic } from '@/core/utils'
import type { RegexDic } from '@/core/utils'

export class DictionaryList {
  private readonly list: RegexDic[]

  constructor(list: RegexDic[]) {
    this.list = list
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
