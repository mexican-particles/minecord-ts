#!/usr/bin/env node

import '@babel/polyfill'
import { Message } from 'discord.js'
import { client, config, error, info, onLine, onMessage, onReady, tail } from '@/core'

info('Minecord is starting ...')

client.on<'ready'>(
  'ready',
  async (): Promise<void> => {
    await onReady()
    info('Minecord is ready.')
  }
)

client.on<'message'>(
  'message',
  async (message: Message): Promise<void> => {
    await onMessage(message)
  }
)

tail.on(
  'line',
  async (line: string): Promise<void> => {
    await onLine(line)
  }
)


;(async () => {
    try {
      await client.login(config.discordBotToken)
    } catch (err) {
      error(
        'Login failed.',
        { discordBotToken: config.discordBotToken },
        err
      )
    }
  }
)()
