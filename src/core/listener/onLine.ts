import { MessageManager } from 'discord.js'
import { dictionaryList } from '@/core/dictionary'
import { messageFactory } from '@/core/discord'
import { MinecraftLogLine } from '@/core/minecraft'
import { broker, toMinecraftEvent } from '@/core/observer'
import { disconnectRcon } from '@/core/rcon'

export const onLine = async (
  line: string
): Promise<void> => {
  const minecraftLogLine = new MinecraftLogLine(line)
  const clientMessage: MessageManager = await messageFactory()

  const event = new toMinecraftEvent(
    minecraftLogLine,
    clientMessage.channel
  )

  await broker.publish(event)
  await disconnectRcon()

  if (!minecraftLogLine.isServerInfoMessage()) {
    return
  }
  const replaced: string | null = dictionaryList.replace(
    minecraftLogLine.message
  )
  if (replaced !== null) {
    await clientMessage.channel.send(replaced)
  }
}
