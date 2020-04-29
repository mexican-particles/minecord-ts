import { Plugin } from '@/Plugin'
import { replaceWithRegexDic } from '@/dictionaryHelper'
import { cmdRegexRepDic } from '@/plugins/libs/cmdRegex'
import { cmdInvoker } from '@/plugins/libs/cmdInvoker'

const command: Plugin = {
  async discord({ message, sendToMinecraft }): Promise<void> {
    await Promise.all(
      message.cleanContent.split(/\r?\n/g).map(
        async (command: string): Promise<void> => {
          await cmdInvoker(command, sendToMinecraft)
        }
      )
    )
  },

  async minecraft({ logLine, sendToDiscord, sendToMinecraft }) {
    if (!logLine.isServerInfoMessage()) {
      return
    }
    const newMessage: string | null = replaceWithRegexDic(
      logLine.message,
      cmdRegexRepDic
    )
    if (newMessage !== null) {
      await sendToDiscord({ content: newMessage })
      await sendToMinecraft(
        `tellraw @a ${JSON.stringify({ text: newMessage })}`
      )
    }
  },
}

export default command
