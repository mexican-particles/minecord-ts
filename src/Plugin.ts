import { PluginArgs } from './pluginHelper'

export default class Plugin {
  readonly discord: PluginArgs['discord']
  readonly minecraft: PluginArgs['minecraft']

  constructor(args: PluginArgs) {
    this.discord = args.discord
    this.minecraft = args.minecraft
  }
}
