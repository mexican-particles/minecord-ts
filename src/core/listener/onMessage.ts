import { Message, MessageManager } from 'discord.js'
import { messageFactory } from '@/core/discord'
import { error } from '@/core/logger'
import { broker, toDiscordEvent } from '@/core/observer'
import { disconnectRcon } from '@/core/rcon'

export const onMessage = async (
  message: Message
): Promise<void> => {
  if (message.author.bot) {
    return
  }

  const clientMessage: MessageManager = await messageFactory()
  if (message.channel.id !== clientMessage.channel.id) {
    error(
      'The CHANNEL IDs received by the ClientObject and MessageObject do not match.',
      {
        messageClientId: message.channel.id,
        clientAuthorId: clientMessage.channel.id
      }
    )
    return
  }

  const event = new toDiscordEvent(
    message,
    clientMessage.channel
  )

  await broker.publish(event)
  await disconnectRcon()
}
