import { Client, ClientUser, Message } from 'discord.js'
import Rcon from 'rcon-ts'
import config from './config'
import Plugin from './Plugin'
import MinecraftLogLine from './MinecraftLogLine'
import Replacers from './Replacers'
import { RegexDic, RegexRepDic } from './plugins/dictionaries/types'

type MinecraftArgs = {
  logLine: MinecraftLogLine
  channel: Message['channel']
  user: Client['user']
  sendToDiscord: (
    ...args: Parameters<Message['channel']['send']>
  ) => Promise<Message>
  sendToMinecraft: (
    ...args: Parameters<Rcon['send']>
  ) => ReturnType<Rcon['send']>
}

type DiscordArgs = {
  message: Message
  user: Client['user']
  sendToDiscord: (
    ...args: Parameters<Message['channel']['send']>
  ) => Promise<Message>
  sendToMinecraft: (
    ...args: Parameters<Rcon['send']>
  ) => ReturnType<Rcon['send']>
}

export type PluginArgs = {
  discord: (arg: DiscordArgs) => void
  minecraft: (arg: MinecraftArgs) => void
}

export const loadPlugins = (pluginNames: string[] = []): Plugin[] => {
  const { pluginsDir } = config()

  const plugins: Plugin[] = []

  pluginNames.map((pluginName: string) => {
    let plugin: Plugin | null = null

    try {
      if (pluginsDir) plugin = require(`${pluginsDir}/${pluginName}`).default
    } catch (e) {}

    try {
      if (!plugin) plugin = require(`minecord-plugin-${pluginName}`).default
    } catch (e) {}

    try {
      if (!plugin) plugin = require(`./plugins/${pluginName}`).default
    } catch (e) {}

    if (plugin) {
      plugins.push(plugin)
      console.log(`${pluginName} を読み込みました`)
    } else {
      console.log(`${pluginName} は読み込めませんでした`)
    }
  })

  return plugins
}

export const sendToMinecraftWithRegexDic = async (
  { logLine, sendToDiscord }: MinecraftArgs,
  regexDic: RegexDic
): Promise<void> => {
  if (!logLine.isServerInfoMessage()) {
    return
  }

  if (Object.values(regexDic).some((regexp) => regexp.test(logLine.message))) {
    await sendToDiscord(logLine.message)
  }
}

export const sendToMinecraftWithRegexRepDic = async (
  { logLine, sendToDiscord }: MinecraftArgs,
  regexRepDic: RegexRepDic
): Promise<void> => {
  if (!logLine.isServerInfoMessage()) {
    return
  }
  const newMessage = new Replacers()
    .addDic(regexRepDic)
    .replace(logLine.message)

  if (newMessage !== false) {
    await sendToDiscord(newMessage)
  }
}
