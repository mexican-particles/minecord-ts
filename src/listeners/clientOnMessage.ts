import { PluginList } from '@/plugin/pluginList'
import { disconnectRcon } from '@/rcon/disconnectRcon'
import { sendRcon } from '@/rcon/sendRcon'
import { messageFactory } from '@/utils/messageFactory'
import { Client, Message } from 'discord.js'

export const clientOnMessage = async (
  pluginList: PluginList,
  client: Client,
  message: Message
): Promise<void> => {
  if (message.author.bot) {
    return
  }
  const clientMessage: Message = await messageFactory(client)
  if (message.channel.id !== clientMessage.channel.id) {
    console.log(
      'クライアント、メッセージそれぞれから取得したチャンネルIDが一致しません',
      {
        messageClientId: message.channel.id,
        clientAuthorId: clientMessage.channel.id,
      }
    )
    return
  }

  await pluginList.discord({
    message,
    user: client.user,
    sendToDiscord: async (
      ...args: Parameters<Message['channel']['send']>
    ): Promise<Message> => await message.channel.send(args),
    sendToMinecraft: async (args: string): Promise<string> =>
      await sendRcon(args),
  })

  await disconnectRcon()
}
