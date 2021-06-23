#!/usr/bin/env node

import '@babel/polyfill'
import config from '@/config/config'
import { DictionaryList } from '@/dictionary/dictionaryList'
import { clientOnMessage } from '@/listeners/clientOnMessage'
import { Tail } from '@/listeners/tail'
import { tailOnLine } from '@/listeners/tailOnLine'
import { PluginList } from '@/plugin/pluginList'
import { messageFactory } from '@/utils/messageFactory'
import { Client, Message } from 'discord.js'

console.log('Minecord を開始しています ...')

const client: Client = new Client()
client.on<'ready'>(
  'ready',
  async (): Promise<void> => {
    await messageFactory(client)
    console.log('準備が完了しました')
  }
)

const pluginList = new PluginList()
client.on<'message'>(
  'message',
  async (message: Message): Promise<void> => {
    await clientOnMessage(pluginList, client, message)
  }
)

const dictionaryList: DictionaryList = new DictionaryList()
const tail: Tail = new Tail()
tail.on(
  'line',
  async (line: string): Promise<void> => {
    await tailOnLine(pluginList, dictionaryList, client, line)
  }
)

;(async () => await client.login(config().discordBotToken))()
