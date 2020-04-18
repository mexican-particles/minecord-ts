#!/usr/bin/env node

import '@babel/polyfill'
import config from './config'
import { Channel, Client, DMChannel, Message, TextChannel } from 'discord.js'
import Rcon from 'rcon-ts'
import Tail from './Tail'
import { loadPlugins } from './pluginHelper'
import Plugin from './Plugin'

const {
  enable,
  disable,
  minecraftLog,
  minecraftRconHost,
  minecraftRconPort,
  minecraftRconPassword,
  discordBotToken,
  discordChannel,
  encode,
} = config()

process.stdout.write('Starting Minecord ... ')

const client: Client = new Client()
let clientChannel: Channel
client.on(
  'ready',
  async (): Promise<void> => {
    clientChannel = await client.channels.fetch(discordChannel)
    console.log('Done!!')
  }
)

const rcon: Rcon = new Rcon({
  host: minecraftRconHost,
  port: minecraftRconPort,
  password: minecraftRconPassword,
})
const plugins: Plugin[] = loadPlugins(
  enable.filter((pluginName) => !disable.includes(pluginName))
)
client.on(
  'message',
  async (message: Message): Promise<void> => {
    if (message.channel.id !== clientChannel.id) {
      console.log(
        'クライアント、メッセージそれぞれから取得したチャンネルIDが一致しません',
        {
          messageClientId: message.channel.id,
          clientAuthorId: clientChannel.id,
        }
      )
      return
    }
    if (message.author.bot || message.author.id === client.user?.id) {
      console.log('クライアント、メッセージそれぞれから取得したユーザIDが一致しません', {
        messageAuthorBot: message.author.bot,
        messageAuthorId: message.author.id,
        clientUserId: client.user?.id,
      })
      return
    }

    await rcon.connect()
    await Promise.all(
      plugins.map(({ discord }: Plugin) =>
        discord({
          message: message,
          channel: message.channel,
          user: client.user,
          sendToDiscord: (...args: Parameters<Message['channel']['send']>) =>
            message.channel.send(...args),
          sendToMinecraft: (args: string) => rcon.send(args),
        })
      )
    )
    await rcon.disconnect()
  }
)

const tail: Tail = new Tail(minecraftLog, encode)
const regexpLog: RegExp = /^\[(.*)]\s\[([^/]*)\/(.*)][^:]*:\s(.*)$/
tail.on('line', async (line: string) => {
  const regExpExecArray = regexpLog.exec(line)
  if (regExpExecArray === null) {
    console.log('出力されたログが期待した形式と異なります', { line: line })
    return
  }

  const [log, time, causedAt, level, message]: RegExpExecArray = regExpExecArray
  const fetchedChannel: Channel = await client.channels.fetch(discordChannel)
  const canHandle = (ch: any): ch is TextChannel | DMChannel => {
    return ch instanceof TextChannel || ch instanceof DMChannel
  }
  if (!canHandle(fetchedChannel)) {
    console.log('この Discord のチャンネルは非対応の形式です', {
      fetchedChannel,
    })
    return
  }
  const fetchedMessage: Message = new Message(client, {}, fetchedChannel)

  await Promise.all(
    plugins.map(({ minecraft }: Plugin) =>
      minecraft({
        log,
        time,
        causedAt,
        level,
        message,
        channel: fetchedMessage.channel,
        user: client.user,
        sendToDiscord: (...args: Parameters<Message['channel']['send']>) =>
          fetchedMessage.channel.send(...args),
        sendToMinecraft: (args: string) => rcon.send(args),
      })
    )
  )
})

client.login(discordBotToken)
