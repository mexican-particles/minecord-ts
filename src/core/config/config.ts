import {command} from '@/core/config/command'
import {configDefault} from '@/core/config/configDefault'
import {configLoggerFactory} from "@/core/config/configLoggerFactory";
import type {Config, UnpackableProps} from '@/core/config/types'

const opts = command.opts() as Partial<Config>
const defined = require('@/config.json') as Partial<Config>

const getConfigValue = <K extends keyof Config>(key: K): Config[K] => {
  return opts?.[key] ?? defined?.[key] ?? configDefault[key]
}

const unpackConfigValue = <K extends UnpackableProps>(key: K): Config[K] => {
  return [
    ...(opts?.[key] ?? []),
    ...(defined?.[key] ?? []),
    ...configDefault[key],
  ]
}

export const config = {
  language: getConfigValue('language'),
  pluginList: unpackConfigValue('pluginList'),
  pluginDir: getConfigValue('pluginDir'),
  dictionaryList: unpackConfigValue('dictionaryList'),
  dictionaryDir: getConfigValue('dictionaryDir'),
  minecraftLog: getConfigValue('minecraftLog'),
  minecraftRconHost: getConfigValue('minecraftRconHost'),
  minecraftRconPort: getConfigValue('minecraftRconPort'),
  minecraftRconPassword: getConfigValue('minecraftRconPassword'),
  discordBotToken: getConfigValue('discordBotToken'),
  discordChannel: getConfigValue('discordChannel'),
  logLevel: getConfigValue('logLevel'),
  encode: getConfigValue('encode'),
}

configLoggerFactory().debug('Object: Config is loaded.')
