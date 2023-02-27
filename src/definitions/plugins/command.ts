import { cmdInvoker } from './libs/cmdInvoker'
import { cmdRegexRepDic } from './libs/cmdRegex'
import { AbstractPlugin, replaceWithRegexDic, toDiscordEvent, toMinecraftEvent } from '@/core'

class Command extends AbstractPlugin {
  async discord(e: toDiscordEvent): Promise<void> {
    await Promise.all(
      e.message.cleanContent.split(/\r?\n/g).map(
        async (command: string): Promise<void> => {
          await cmdInvoker(command, e.sendToMinecraft)
        }
      )
    )
  }

  async minecraft(e: toMinecraftEvent): Promise<void> {
    if (!e.logLine.isServerInfoMessage()) {
      return
    }
    const newMessage: string | null = replaceWithRegexDic(
      e.logLine.message,
      cmdRegexRepDic
    )
    if (newMessage !== null) {
      await e.sendToDiscord(newMessage)
      await e.sendToMinecraft(
        `tellraw @a ${JSON.stringify({ text: newMessage })}`
      )
    }
  }
}

export default Command
