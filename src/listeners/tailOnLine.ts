import { DictionaryList } from '@/dictionary/dictionaryList'
import { PluginList } from '@/plugin/pluginList'
import { disconnectRcon } from '@/rcon/disconnectRcon'
import { sendRcon } from '@/rcon/sendRcon'
import { messageFactory } from '@/utils/messageFactory'
import { MinecraftLogLine } from '@/utils/minecraftLogLine'
import { Client, Message } from 'discord.js'

export const tailOnLine = async (
  pluginList: PluginList,
  dictionaryList: DictionaryList,
  client: Client,
  line: string
): Promise<void> => {
  const regexpLog: RegExp = /^\[(.*)]\s\[([^/]*)\/(.*)][^:]*:\s(.*)$/
  const regExpExecArray: RegExpExecArray | null = regexpLog.exec(line)
  if (regExpExecArray === null) {
    console.log('出力されたログが期待した形式と異なります', { line })
    return
  }
  const minecraftLogLine = new MinecraftLogLine(regExpExecArray)
  const clientMessage: Message = await messageFactory(client)

  await pluginList.minecraft({
    logLine: minecraftLogLine,
    channel: clientMessage.channel,
    user: client.user,
    sendToDiscord: async (
      ...args: Parameters<Message['channel']['send']>
    ): Promise<Message> => await clientMessage.channel.send(args),
    sendToMinecraft: async (args: string): Promise<string> =>
      await sendRcon(args),
  })

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
