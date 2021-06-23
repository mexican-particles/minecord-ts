import { rcon } from '@/rcon/rcon'
import Rcon from 'rcon-ts'

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
