#!/usr/bin/env node

import '@babel/polyfill'
import config from './config'
import { Client, Message } from 'discord.js'
import Rcon from 'rcon-ts'
import Tail from './Tail'
import { tailOnLine } from './listeners/tailOnLine'
import { clientOnMessage } from './listeners/clientOnMessage'
import { clientOnReady } from './listeners/clientOnReady'
import DictionaryList from './DictionaryList'
import PluginList from './PluginList'

const {
  minecraftLog,
  minecraftRconHost,
  minecraftRconPort,
  minecraftRconPassword,
  discordBotToken,
  discordChannel,
  encode,
} = config()

console.log('Minecord を開始しています ...')

const client: Client = new Client()
let clientMessage: Message
client.on(
  'ready',
  async (): Promise<void> => {
    clientMessage = await clientOnReady(client, discordChannel)
    console.log('準備が完了しました')
  }
)

const rcon: Rcon = new Rcon({
  host: minecraftRconHost,
  port: minecraftRconPort,
  password: minecraftRconPassword,
})
const pluginList = new PluginList()
client.on(
  'message',
  async (message: Message): Promise<void> => {
    await clientOnMessage(pluginList, clientMessage, client.user, rcon, message)
  }
)

const dictionaryList: DictionaryList = new DictionaryList()
const tail: Tail = new Tail(minecraftLog, encode)
tail.on(
  'line',
  async (line: string): Promise<void> => {
    await tailOnLine(
      pluginList,
      dictionaryList,
      clientMessage,
      client.user,
      rcon,
      line
    )
  }
)

client.login(discordBotToken)
