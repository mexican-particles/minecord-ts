import { RegexDic, replaceWithRegexDic } from './dictionaryHelper'
import config from './config'
import { moduleLoader } from './moduleLoader'

export default class DictionaryList {
  private readonly list: RegexDic[]

  constructor() {
    this.list = this.loadDictionary()
  }

  private loadDictionary(): RegexDic[] {
    const dictionaryPathList: string[] = ['./dictionaries/']
    if (config().dictionaryDir) {
      dictionaryPathList.push(config().dictionaryDir)
    }
    return moduleLoader<RegexDic>(config().dictionaryList, dictionaryPathList)
  }

  replace(needle: string): string | null {
    for (const key in this.list) {
      if (!this.list.hasOwnProperty(key)) {
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
