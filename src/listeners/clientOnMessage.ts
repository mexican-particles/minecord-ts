import { Client, Message } from 'discord.js'
import Rcon from 'rcon-ts'
import PluginList from '../PluginList'

export const clientOnMessage = async (
  pluginList: PluginList,
  clientMessage: Message,
  user: Client['user'],
  rcon: Rcon,
  message: Message
): Promise<void> => {
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
  if (message.author.bot || message.author.id === user?.id) {
    console.log(
      'クライアント、メッセージそれぞれから取得したユーザIDが一致しません',
      {
        messageAuthorBot: message.author.bot,
        messageAuthorId: message.author.id,
        clientUserId: user?.id,
      }
    )
    return
  }

  await rcon.connect()
  console.log('RCON に接続しました')

  await pluginList.discord({
    message: message,
    user: user,
    sendToDiscord: (...args: Parameters<Message['channel']['send']>) =>
      message.channel.send(...args),
    sendToMinecraft: (args: string) => rcon.send(args),
  })

  await rcon.disconnect()
  console.log('RCON から切断しました')
}
