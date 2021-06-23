import { rcon } from '@/rcon/rcon'

export const disconnectRcon = async (): Promise<void> => {
  if (rcon.state > 0) {
    await rcon.disconnect()
    console.log('RCON から切断しました')
  }
}
