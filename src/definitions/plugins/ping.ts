import { AbstractPlugin, toDiscordEvent, toMinecraftEvent } from '@/core'

class Ping extends AbstractPlugin {
  async discord(e: toDiscordEvent): Promise<void> {
    if (e.message.cleanContent !== '!ping') {
      return
    }
    await e.sendToDiscord('pong, from minecord')
    const result = await e.sendToMinecraft('time query gametime')
    if (/^The time is \w+$/.test(result)) {
      await e.sendToDiscord('pong, from minecraft')
      return
    }
    await e.sendToDiscord('May not be connected to Minecraft.')
  }

  async minecraft(_e: toMinecraftEvent): Promise<void> {
  }
}

export default Ping
