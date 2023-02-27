import Rcon from 'rcon-ts'
import { config } from '@/core/config'

export const rconFactory: Rcon = new Rcon({
  host: config.minecraftRconHost,
  port: config.minecraftRconPort,
  password: config.minecraftRconPassword
})
