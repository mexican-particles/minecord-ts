import { Client, Message } from 'discord.js'
import Plugin from './Plugin'
import Rcon from 'rcon-ts'

export const clientOnMessage = async (
  plugins: Plugin[],
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
  await Promise.all(
    plugins.map(({ discord }: Plugin) =>
      discord({
        message: message,
        user: user,
        sendToDiscord: (...args: Parameters<Message['channel']['send']>) =>
          message.channel.send(...args),
        sendToMinecraft: (args: string) => rcon.send(args),
      })
    )
  )
  await rcon.disconnect()
}
