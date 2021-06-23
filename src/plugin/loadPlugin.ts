import config from '@/config/config'
import type { Plugin } from '@/plugin/types'
import { moduleLoader } from '@/utils/moduleLoader'

export const loadPlugin = (): Plugin[] => {
  const pluginPathList: string[] = ['./../definitions/plugins/']
  if (config().pluginDir) {
    pluginPathList.push(config().pluginDir)
  }
  return moduleLoader<Plugin>(config().pluginList, pluginPathList)
}
