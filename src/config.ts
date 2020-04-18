import packageJson from '../package.json'
import commander from 'commander'

type Config = {
  pluginsDir: string | null
  enable: string[]
  disable: string[]
  minecraftLog: string
  minecraftRconHost: string
  minecraftRconPort: number
  minecraftRconPassword: string
  discordBotToken: string
  discordChannel: string
  encode: string
}

const configDefault: Config = {
  pluginsDir: null,
  enable: ['chat'],
  disable: [],
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
  .option('-p, --plugins-dir <dir>', 'set local plugins directory')
  .option(
    '--enable <plugins>',
    'enable plugin by name, "--enable PLUGIN1,PLUGIN2" for multiple plugins',
    (list) => list.split(',')
  )
  .option(
    '--disable <plugins>',
    'disable plugin by name, "--disable PLUGIN1,PLUGIN2" for multiple plugins',
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
    pluginsDir:
      commander.pluginsDir || config.pluginsDir || configDefault.pluginsDir,
    enable: [
      ...new Set([
        ...(commander.enable || []),
        ...(config.enable || []),
        ...configDefault.enable,
      ]),
    ],
    disable: [
      ...new Set([
        ...(commander.disable || []),
        ...(config.disable || []),
        ...configDefault.disable,
      ]),
    ],
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
  return cache
}
