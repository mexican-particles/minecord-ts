import { Client, MessageManager } from 'discord.js'
import { EventId, IEvent, SendToDiscord, sendToMinecraft } from '../types'
import { client } from '@/core/discord'
import { MinecraftLogLine } from '@/core/minecraft'
import { sendRcon } from '@/core/rcon'

export class toMinecraftEvent implements IEvent {
  readonly logLine: MinecraftLogLine
  readonly channel: MessageManager['channel']
  readonly sendToDiscord: SendToDiscord
  readonly sendToMinecraft: sendToMinecraft
  readonly user: Client['user']

  constructor(
    logLine: toMinecraftEvent['logLine'],
    channel: toMinecraftEvent['channel'],
  ) {
    this.logLine = logLine
    this.channel = channel
    this.sendToDiscord = channel.send
    this.sendToMinecraft = sendRcon
    this.user = client.user
  }

  eventId(): EventId {
    return 'toMinecraftEvent'
  }
}
