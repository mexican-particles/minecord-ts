import { Channel, DMChannel, MessageManager, TextChannel } from 'discord.js'
import { client } from './clientFactory'
import { config } from '@/core/config'
import { debug, error } from '@/core/logger'

let cache: MessageManager
export const messageFactory = async (): Promise<MessageManager> => {
  if (cache) {
    return cache
  }

  const fetchedChannel: Channel | null = await client.channels.fetch(
    config.discordChannel
  )

  const canHandle = (ch: any): ch is TextChannel | DMChannel => {
    return ch instanceof TextChannel || ch instanceof DMChannel
  }

  if (!canHandle(fetchedChannel)) {
    error('This Discord channel is unsupported type.', fetchedChannel)
    throw new Error('unsupported channel type')
  }

  debug('Object: Message is loaded.')
  cache = fetchedChannel.messages
  return cache
}
