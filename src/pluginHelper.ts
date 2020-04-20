import { ClientUser, Message } from 'discord.js'
import Rcon from 'rcon-ts'
import config from './config'
import Plugin from './Plugin'

type ToMinecraftArgs = {
  log: string
  time: string
  causedAt: string
  level: string
  message: string
  channel: Message['channel']
  user: ClientUser | null
  sendToDiscord: (
    ...args: Parameters<Message['channel']['send']>
  ) => Promise<Message>
  sendToMinecraft: (
    ...args: Parameters<Rcon['send']>
  ) => ReturnType<Rcon['send']>
}

type ToDiscordArgs = {
  message: Message
  channel: Message['channel']
  user: ClientUser | null
  sendToDiscord: (
    ...args: Parameters<Message['channel']['send']>
  ) => Promise<Message>
  sendToMinecraft: (
    ...args: Parameters<Rcon['send']>
  ) => ReturnType<Rcon['send']>
}

export type PluginArgs = {
  discord: (arg: ToDiscordArgs) => void
  minecraft: (arg: ToMinecraftArgs) => void
}

export const loadPlugins = (pluginNames: string[] = []): Plugin[] => {
  const { pluginsDir } = config()

  const plugins: Plugin[] = []

  pluginNames.map((pluginName: string) => {
    let plugin: Plugin | null = null
    let error = null

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
