import program from '@/config/commander'
import { configDefault } from '@/config/configDefault'
import type { Config } from '@/config/types'

let cache: Config
export default (): Config => {
  if (cache) {
    return cache
  }

  const opts = program.opts() as Partial<Config>
  const config = require('@/config.json') as Partial<Config>

  cache = {
    language: opts.language ?? config.language ?? configDefault.language,
    pluginList: [
      ...new Set([
        ...configDefault.pluginList,
        ...(config.pluginList ?? []),
        ...(opts.pluginList ?? []),

      ]),
    ],
    pluginDir:
      opts.pluginDir ?? config.pluginDir ?? configDefault.pluginDir,
    dictionaryList: [
      ...new Set([
        ...configDefault.dictionaryList,
        ...(config.dictionaryList ?? []),
        ...(opts.dictionaryList ?? []),
      ]),
    ],
    dictionaryDir:
      opts.dictionaryDir ??
      config.dictionaryDir ??
      configDefault.dictionaryDir,
    minecraftLog:
      opts.minecraftLog ??
      config.minecraftLog ??
      configDefault.minecraftLog,
    minecraftRconHost:
      opts.minecraftRconHost ??
      config.minecraftRconHost ??
      configDefault.minecraftRconHost,
    minecraftRconPort:
      opts.minecraftRconPort ??
      config.minecraftRconPort ??
      configDefault.minecraftRconPort,
    minecraftRconPassword:
      opts.minecraftRconPassword ??
      config.minecraftRconPassword ??
      configDefault.minecraftRconPassword,
    discordBotToken:
      opts.discordBotToken ??
      config.discordBotToken ??
      configDefault.discordBotToken,
    discordChannel:
      opts.discordChannel ??
      config.discordChannel ??
      configDefault.discordChannel,
    encode: opts.encode ?? config.encode ?? configDefault.encode,
  }

  console.log('設定ファイルを読み込みました')
  return cache
}
