export type Config = {
  language: 'en' | 'ja'
  pluginList: string[]
  pluginDir: string
  dictionaryList: string[]
  dictionaryDir: string
  minecraftLog: string
  minecraftRconHost: string
  minecraftRconPort: number
  minecraftRconPassword: string
  discordBotToken: string
  discordChannel: string
  encode: string
}
