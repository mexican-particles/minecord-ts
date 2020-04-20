import Plugin from '../Plugin'
import { chatRegexRepDic } from './dictionaries/chatRegex'
import { sendToMinecraftWithRegexRepDic } from '../pluginHelper'

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

  async minecraft(args): Promise<void> {
    if (!args.logLine.isUnmutedChatMessage()) {
      return
    }
    await sendToMinecraftWithRegexRepDic(args, chatRegexRepDic)
  },
})
