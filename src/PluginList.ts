import config from './config'
import { moduleLoader } from './moduleLoader'
import { Plugin } from './Plugin'

export default class PluginList {
  private readonly list: Plugin[]

  constructor() {
    this.list = this.loadDictionary()
  }

  private loadDictionary(): Plugin[] {
    const pluginPathList: string[] = ['./plugins/']
    if (config().pluginDir) {
      pluginPathList.push(config().pluginDir)
    }
    return moduleLoader<Plugin>(config().pluginList, pluginPathList)
  }

  async minecraft(
    ...args: Parameters<Required<Plugin>['minecraft']>
  ): Promise<void> {
    await Promise.all(this.list.map(async (plugin: Plugin) => {
      if (typeof plugin?.minecraft === 'undefined') {
        return
      }
      await plugin.minecraft(...args)
    }))
  }

  async discord(
    ...args: Parameters<Required<Plugin>['discord']>
  ): Promise<void> {
    await Promise.all(this.list.map(async (plugin: Plugin) => {
      if (typeof plugin?.discord === 'undefined') {
        return
      }
      await plugin.discord(...args)
    }))
  }
}
