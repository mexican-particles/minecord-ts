import type { Config } from '@/core/config/types'

export const configDefault: Config = {
  language: 'en',
  pluginList: ['ping'],
  pluginDir: '',
  dictionaryList: ['server'],
  dictionaryDir: '',
  minecraftLog: '/var/minecraft/logs/latest.log',
  minecraftRconHost: 'localhost',
  minecraftRconPort: 25575,
  minecraftRconPassword: 'secret',
  discordBotToken: '',
  discordChannel: '',
  encode: 'utf-8',
  logLevel: 'info',
}
