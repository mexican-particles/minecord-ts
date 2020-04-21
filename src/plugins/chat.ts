import Plugin from '../Plugin'
import { chatRegexRepDic } from './dictionaries/chatRegex'
import Replacers from '../Replacers'

export default new Plugin({
  async discord({ message, sendToMinecraft }): Promise<void> {
    if (message.cleanContent.startsWith('!')) {
      return
    }
    const text: string = `<${
      (message.member && message.member.nickname) || message.author.username
    }> ${message.cleanContent}`
    await sendToMinecraft(`tellraw @a ${JSON.stringify({ text: text })}`)
  },

  async minecraft({logLine, sendToDiscord} ): Promise<void> {
    if (!logLine.isUnmutedChatMessage()) {
      return
    }
    const newMessage = new Replacers()
      .addDic(chatRegexRepDic)
      .replace(logLine.message)

    if (newMessage !== false) {
      await sendToDiscord(newMessage)
    }
  },
})
