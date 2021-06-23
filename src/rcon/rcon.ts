import config from '@/config/config'
import Rcon from 'rcon-ts'

export const rcon: Rcon = new Rcon({
  host: config().minecraftRconHost,
  port: config().minecraftRconPort,
  password: config().minecraftRconPassword,
})
