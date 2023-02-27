import { DictionaryList } from './dictionaryList'
import { config } from '@/core/config'
import { debug } from '@/core/logger'
import type { RegexDic } from '@/core/utils'
import { moduleLoader } from '@/core/utils'

const dictionaryPathList: string[] = ['./../../definitions/dictionaries']
if (config.dictionaryDir) {
  dictionaryPathList.push(config.dictionaryDir)
}

const list = moduleLoader<RegexDic>(config.dictionaryList, dictionaryPathList)
export const dictionaryList = new DictionaryList(list)

debug('Object: dictionaryList is loaded.')
