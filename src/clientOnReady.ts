import { Channel, Client, DMChannel, Message, TextChannel } from 'discord.js'

export const clientOnReady = async (
  client: Client,
  discordChannel: string
): Promise<Message> => {
  const fetchedChannel: Channel = await client.channels.fetch(discordChannel)
  const canHandle = (ch: any): ch is TextChannel | DMChannel => {
    return ch instanceof TextChannel || ch instanceof DMChannel
  }
  if (!canHandle(fetchedChannel)) {
    console.log('この Discord のチャンネルは非対応の形式です', fetchedChannel)
    throw Error('非対応の Discord チャンネル')
  }
  return new Message(client, {}, fetchedChannel)
}
