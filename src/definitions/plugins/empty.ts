import { AbstractPlugin, toDiscordEvent, toMinecraftEvent } from '@/core'

class Empty extends AbstractPlugin {
  async discord(event: toDiscordEvent): Promise<void> {
    // Processing when receiving a message from Discord.
    // Define the action when a message is received from Discord.
  }

  async minecraft(event: toMinecraftEvent): Promise<void> {
    // Processing when receiving a message from Minecraft.
    // Define the action when a message is received from Minecraft.
  }
}

export default Empty
