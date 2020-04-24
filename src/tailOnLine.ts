import MinecraftLogLine from './MinecraftLogLine'
import Plugin from './Plugin'
import { Client, Message } from 'discord.js'
import Rcon from 'rcon-ts'

const regexpLog: RegExp = /^\[(.*)]\s\[([^/]*)\/(.*)][^:]*:\s(.*)$/
export const tailOnLine = async (
  plugins: Plugin[],
  clientMessage: Message,
  user: Client['user'],
  rcon: Rcon,
  line: string
):Promise<void> => {
  const regExpExecArray = regexpLog.exec(line)
  if (regExpExecArray === null) {
    console.log('出力されたログが期待した形式と異なります', { line: line })
    return
  }

  const minecraftLogLine = new MinecraftLogLine(regExpExecArray)
  await Promise.all(
    plugins.map(({ minecraft }: Plugin) =>
      minecraft({
        logLine: minecraftLogLine,
        channel: clientMessage.channel,
        user,
        sendToDiscord: (...args: Parameters<Message['channel']['send']>) =>
          clientMessage.channel.send(...args),
        sendToMinecraft: (args: string) => rcon.send(args),
      })
    )
  )
}
