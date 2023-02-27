export interface Config {
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
  logLevel: 'debug' | 'info' | 'error'
}

type UnpackableProps = keyof { [K in keyof Config as Config[K] extends any[] ? K : never]: any } & keyof Config
