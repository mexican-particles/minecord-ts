import { Plugin } from '../Plugin'
import { cmdRegexRepDic } from './libs/cmdRegex'
import { replaceWithRegexDic } from '../dictionaryHelper'
import { cmdInvoker } from './libs/cmdInvoker'

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

  async minecraft({ logLine, sendToDiscord }) {
    if (!logLine.isServerInfoMessage()) {
      return
    }
    const newMessage: string | null = replaceWithRegexDic(
      logLine.message,
      cmdRegexRepDic
    )
    if (newMessage !== null) {
      await sendToDiscord(newMessage)
    }
  },
}

export default command
