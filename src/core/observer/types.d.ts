import { PartialTextBasedChannelFields } from 'discord.js'
import Rcon from 'rcon-ts'

export type EventId = string

export interface IEvent {
  eventId(): EventId
}

export type SubscribeList = {
  [key: EventId]: ISubscribe[]
}

export interface ISubscribe {
  onMessage(event: IEvent): Promise<void>
}

export type SendToDiscord = PartialTextBasedChannelFields['send']
export type sendToMinecraft = Rcon['send']
