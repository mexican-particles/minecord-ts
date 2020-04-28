import { Channel, Client, DMChannel, Message, TextChannel } from 'discord.js'
import config from './config'

const canHandle = (ch: any): ch is TextChannel | DMChannel => {
  return ch instanceof TextChannel || ch instanceof DMChannel
}

let message: Message
export const messageFactory = async (client: Client): Promise<Message> => {
  if (message) {
    return message
  }
  const fetchedChannel: Channel = await client.channels.fetch(
    config().discordChannel
  )
  if (!canHandle(fetchedChannel)) {
    console.log('この Discord のチャンネルは非対応の形式です', fetchedChannel)
    throw Error('非対応の Discord チャンネル')
  }
  message = new Message(client, {}, fetchedChannel)
  return message
}
