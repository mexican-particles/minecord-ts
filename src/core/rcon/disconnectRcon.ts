import consola from 'consola'
import { rconFactory } from './rconFactory'

export const disconnectRcon = async (): Promise<void> => {
  if (rconFactory.state > 0) {
    await rconFactory.disconnect()
    consola.info('Disconnected from RCON.')
  }
}
