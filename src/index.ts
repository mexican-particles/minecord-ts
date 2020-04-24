#!/usr/bin/env node

import '@babel/polyfill'
import config from './config'
import { Client, Message } from 'discord.js'
import Rcon from 'rcon-ts'
import Tail from './Tail'
import { loadPlugins } from './pluginHelper'
import Plugin from './Plugin'
import { tailOnLine } from './tailOnLine'
import { clientOnMessage } from './clientOnMessage'
import { clientOnReady } from './clientOnReady'

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
const plugins: Plugin[] = loadPlugins(
  enable.filter((pluginName) => !disable.includes(pluginName))
)
client.on(
  'message',
  async (message: Message): Promise<void> => {
    await clientOnMessage(plugins, clientMessage, client.user, rcon, message)
  }
)

const tail: Tail = new Tail(minecraftLog, encode)
tail.on('line', async (line: string) => {
  await tailOnLine(plugins, clientMessage, client.user, rcon, line)
})

client.login(discordBotToken)
