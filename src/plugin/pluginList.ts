import { loadPlugin } from '@/plugin/loadPlugin'
import type { Plugin } from '@/plugin/types'

export class PluginList {
  private readonly list: Plugin[]

  constructor() {
    this.list = loadPlugin()
  }

  async minecraft(
    ...args: Parameters<Required<Plugin>['minecraft']>
  ): Promise<void> {
    await Promise.all(
      this.list.map(async (plugin: Plugin) => {
        if (typeof plugin?.minecraft === 'undefined') {
          return
        }
        await plugin.minecraft(...args)
      })
    )
  }

  async discord(
    ...args: Parameters<Required<Plugin>['discord']>
  ): Promise<void> {
    await Promise.all(
      this.list.map(async (plugin: Plugin) => {
        if (typeof plugin?.discord === 'undefined') {
          return
        }
        await plugin.discord(...args)
      })
    )
  }
}
