import { chatRegexRepDic } from './libs/chatRegex'
import { cmdInvoker } from './libs/cmdInvoker'
import { replaceWithRegexDic, toDiscordEvent, toMinecraftEvent, AbstractPlugin } from '@/core'

class Chat extends AbstractPlugin {
  async discord(e: toDiscordEvent): Promise<void> {
    if (e.message.cleanContent.startsWith('!')) {
      return
    }
    const text: string = `<${
      (e.message.member && e.message.member.nickname) || e.message.author.username
    }> ${e.message.cleanContent}`
    await e.sendToMinecraft(`tellraw @a ${JSON.stringify({ text })}`)
  }

  async minecraft(e: toMinecraftEvent): Promise<void> {
    if (e.logLine.isMutedMessage()) {
      return
    }
    const newMessage: string | null = replaceWithRegexDic(
      e.logLine.message,
      chatRegexRepDic
    )
    if (newMessage !== null) {
      await e.sendToDiscord(newMessage)
    }

    const message: string | null =
      /^<[\w\d_]+> (.*)$/.exec(e.logLine.message)?.[1] ?? null
    if (message) {
      await cmdInvoker(message, e.sendToMinecraft)
    }
  }
}

export default Chat
