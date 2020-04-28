import packageJson from '../package.json'
import commander from 'commander'

type Config = {
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

const configDefault: Config = {
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
}

commander
  .version(packageJson.version)
  .option('-c, --config <file>', 'set configuration file')
  .option('-l, --language <lang>', 'set language ("en" or "ja")')
  .option('-p, --pluginList-dir <dir>', 'set local pluginList directory')
  .option(
    '-d, --dictionaryList-dir <dir>',
    'set local dictionaryList directory'
  )
  .option(
    '--pluginList <pluginList>',
    'enable plugin by name, "--enable PLUGIN1,PLUGIN2" for multiple pluginList',
    (list) => list.split(',')
  )
  .option(
    '--dictionaryList <pluginList>',
    'enable dictionary by name, "--enable DICTIONARY1,DICTIONARY2" for multiple dictionaryList',
    (list) => list.split(',')
  )
  .option(
    '--minecraft-log <path>',
    'set the path to Minecraft log (It is recommended to specify them collectively in the configuration file)'
  )
  .option(
    '--minecraft-rcon-host <host>',
    'set the Minecraft Server rcon host (It is recommended to specify them collectively in the configuration file)'
  )
  .option(
    '--minecraft-rcon-port <port>',
    'set the Minecraft Server rcon port (It is recommended to specify them collectively in the configuration file)',
    parseInt
  )
  .option(
    '--minecraft-rcon-password <password>',
    'set the Minecraft Server rcon password (It is recommended to specify them collectively in the configuration file)'
  )
  .option(
    '--discord-bot-token <token>',
    'set Discord bot token (It is recommended to specify them collectively in the configuration file)'
  )
  .option(
    '--discord-channel <id>',
    'set Discord channel ID for for the discord bot (It is recommended to specify them collectively in the configuration file)'
  )
  .option('--encode <charset>', 'set characterset of log file (default: utf-8)')
  .parse(process.argv)

let cache: Config
export default (): Config => {
  if (cache) {
    return cache
  }
  const config: Config =
    commander.config ?? (require('../config.json') as Config)
  cache = {
    language: commander.language || config.language || configDefault.language,
    pluginList: [
      ...new Set([
        ...(commander.pluginList || []),
        ...(config.pluginList || []),
        ...configDefault.pluginList,
      ]),
    ],
    pluginDir:
      commander.pluginDir || config.pluginDir || configDefault.pluginDir,
    dictionaryList: [
      ...new Set([
        ...(commander.dictionaryList || []),
        ...(config.dictionaryList || []),
        ...configDefault.dictionaryList,
      ]),
    ],
    dictionaryDir:
      commander.dictionaryDir ||
      config.dictionaryDir ||
      configDefault.dictionaryDir,
    minecraftLog:
      commander.minecraftLog ||
      config.minecraftLog ||
      configDefault.minecraftLog,
    minecraftRconHost:
      commander.minecraftRconHost ||
      config.minecraftRconHost ||
      configDefault.minecraftRconHost,
    minecraftRconPort:
      commander.minecraftRconPort ||
      config.minecraftRconPort ||
      configDefault.minecraftRconPort,
    minecraftRconPassword:
      commander.minecraftRconPassword ||
      config.minecraftRconPassword ||
      configDefault.minecraftRconPassword,
    discordBotToken:
      commander.discordBotToken ||
      config.discordBotToken ||
      configDefault.discordBotToken,
    discordChannel:
      commander.discordChannel ||
      config.discordChannel ||
      configDefault.discordChannel,
    encode: commander.encode || config.encode || configDefault.encode,
  }
  console.log('設定ファイルを読み込みました')
  return cache
}
