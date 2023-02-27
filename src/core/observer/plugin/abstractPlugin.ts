import { toDiscordEvent } from '../event/toDiscordEvent'
import { toMinecraftEvent } from '../event/toMinecraftEvent'
import { IEvent, ISubscribe } from '../types'

export abstract class AbstractPlugin implements ISubscribe {
  async onMessage(event: IEvent): Promise<void> {
    if (event instanceof toMinecraftEvent) {
      await this.minecraft(event)
      return
    }
    if (event instanceof toDiscordEvent) {
      await this.discord(event)
      return
    }
  }

  abstract minecraft(event: toMinecraftEvent): Promise<void>

  abstract discord(event: toDiscordEvent): Promise<void>
}

