import { Plugin } from '../Plugin'
import { chatRegexRepDic } from './libs/chatRegex'
import { replaceWithRegexDic } from '../dictionaryHelper'

const chat: Plugin = {
  async discord({ message, sendToMinecraft }): Promise<void> {
    if (message.cleanContent.startsWith('!')) {
      return
    }
    const text: string = `<${
      (message.member && message.member.nickname) || message.author.username
    }> ${message.cleanContent}`
    await sendToMinecraft(`tellraw @a ${JSON.stringify({ text: text })}`)
  },

  async minecraft({ logLine, sendToDiscord }): Promise<void> {
    if (!logLine.isUnmutedChatMessage()) {
      return
    }
    const newMessage: string | null = replaceWithRegexDic(
      logLine.message,
      chatRegexRepDic
    )
    if (newMessage !== null) {
      await sendToDiscord(newMessage)
    }
  },
}

export default chat
