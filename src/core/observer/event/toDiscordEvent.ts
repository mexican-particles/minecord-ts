import { Client, Message, MessageManager } from 'discord.js'
import { EventId, IEvent, SendToDiscord, sendToMinecraft } from '../types'
import { client } from '@/core/discord'
import { sendRcon } from '@/core/rcon'

export class toDiscordEvent implements IEvent {
  readonly message: Message
  readonly sendToDiscord: SendToDiscord
  readonly sendToMinecraft: sendToMinecraft
  readonly user: Client['user']

  constructor(
    message: toDiscordEvent['message'],
    channel: MessageManager['channel']
  ) {
    this.message = message
    this.sendToDiscord = channel.send
    this.sendToMinecraft = sendRcon
    this.user = client.user
  }

  eventId(): EventId {
    return 'toDiscordEvent'
  }
}
