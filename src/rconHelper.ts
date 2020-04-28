import Rcon, { State } from 'rcon-ts'
import config from './config'

const rcon: Rcon = new Rcon({
  host: config().minecraftRconHost,
  port: config().minecraftRconPort,
  password: config().minecraftRconPassword,
})

export const sendRcon = async (
  ...args: Parameters<Rcon['send']>
): ReturnType<Rcon['send']> => {
  // State.Disconnected === 0
  if (rcon.state <= 0) {
    await rcon.connect()
    console.log('RCON に接続しました')
  }
  return await rcon.send(...args)
}

export const disconnectRcon = async (): Promise<void> => {
  if (rcon.state > 0) {
    await rcon.disconnect()
    console.log('RCON から切断しました')
  }
}
