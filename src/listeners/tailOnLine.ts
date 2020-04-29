import MinecraftLogLine from '@/MinecraftLogLine'
import { disconnectRcon, sendRcon } from '@/rconHelper'
import { messageFactory } from '@/messageFactory'
import { Client, Message } from 'discord.js'
import PluginList from '@/PluginList'
import DictionaryList from '@/DictionaryList'

const regexpLog: RegExp = /^\[(.*)]\s\[([^/]*)\/(.*)][^:]*:\s(.*)$/
export const tailOnLine = async (
  pluginList: PluginList,
  dictionaryList: DictionaryList,
  client: Client,
  line: string
): Promise<void> => {
  const regExpExecArray: RegExpExecArray | null = regexpLog.exec(line)
  if (regExpExecArray === null) {
    console.log('出力されたログが期待した形式と異なります', { line: line })
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
    ): Promise<Message> => await clientMessage.channel.send(...args),
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
