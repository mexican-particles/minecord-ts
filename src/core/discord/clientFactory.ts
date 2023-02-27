import { Client, GatewayIntentBits } from 'discord.js'
import { debug } from '@/core/logger'

export const client: Client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

debug('Object: Client is loaded.')
