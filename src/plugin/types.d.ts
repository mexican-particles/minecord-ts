import { MinecraftLogLine } from '@/utils/minecraftLogLine'
import { Client, Message } from 'discord.js'
import Rcon from 'rcon-ts'

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

export type Plugin = {
  discord?: (arg: DiscordArgs) => void
  minecraft?: (arg: MinecraftArgs) => void
}
