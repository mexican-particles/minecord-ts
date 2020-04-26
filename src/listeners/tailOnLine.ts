import MinecraftLogLine from '../MinecraftLogLine'
import { Client, Message } from 'discord.js'
import Rcon from 'rcon-ts'
import DictionaryList from '../DictionaryList'
import PluginList from '../PluginList'

const regexpLog: RegExp = /^\[(.*)]\s\[([^/]*)\/(.*)][^:]*:\s(.*)$/
export const tailOnLine = async (
  pluginList: PluginList,
  dictionaryList: DictionaryList,
  clientMessage: Message,
  user: Client['user'],
  rcon: Rcon,
  line: string
): Promise<void> => {
  const regExpExecArray: RegExpExecArray | null = regexpLog.exec(line)
  if (regExpExecArray === null) {
    console.log('出力されたログが期待した形式と異なります', { line: line })
    return
  }
  const minecraftLogLine = new MinecraftLogLine(regExpExecArray)

  await pluginList.minecraft({
    logLine: minecraftLogLine,
    channel: clientMessage.channel,
    user,
    sendToDiscord: (...args: Parameters<Message['channel']['send']>) =>
      clientMessage.channel.send(...args),
    sendToMinecraft: (args: string) => rcon.send(args),
  })

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
