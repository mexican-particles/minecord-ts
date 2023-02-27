import consola from 'consola'
import Rcon from 'rcon-ts'
import { rconFactory } from './rconFactory'

export const sendRcon = async (
  ...args: Parameters<Rcon['send']>
): ReturnType<Rcon['send']> => {
  // State.Disconnected === 0
  if (rconFactory.state <= 0) {
    await rconFactory.connect()
    consola.info('Connected to RCON.')
  }
  return await rconFactory.send(...args)
}
