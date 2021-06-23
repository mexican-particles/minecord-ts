import config from '@/config/config'
import type { RegexDic } from '@/dictionary/types'
import { moduleLoader } from '@/utils/moduleLoader'

export const loadDictionary = (): RegexDic[] => {
  const dictionaryPathList: string[] = ['./../definitions/dictionaries/']
  if (config().dictionaryDir) {
    dictionaryPathList.push(config().dictionaryDir)
  }
  return moduleLoader<RegexDic>(config().dictionaryList, dictionaryPathList)
}
