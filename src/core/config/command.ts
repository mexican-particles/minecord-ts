import {Command} from 'commander'
import {configLoggerFactory} from "@/core/config/configLoggerFactory";

export const command: Command = (new Command('minecord-ts'))
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
  .option(
    '--log-level <id>',
    'set log level (info, debug or error)'
  )
  .option('--encode <charset>', 'set character-set of log file (default: utf-8)')
// .parse(process.argv)


configLoggerFactory().debug('Object: Command is loaded.')
