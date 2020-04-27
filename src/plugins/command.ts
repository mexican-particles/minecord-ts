import { Plugin } from '../Plugin'
import { cmdRegex, cmdRegexRepDic } from './libs/cmdRegex'
import { replaceWithRegexDic } from '../dictionaryHelper'

const command: Plugin = {
  async discord({ message, sendToMinecraft, sendToDiscord }): Promise<void> {
    await message.cleanContent.split(/\r?\n/g).map(
      async (command: string): Promise<void> => {
        if (!command.startsWith('!') || command === '!ping') {
          return
        }

        for (const key in cmdRegex) {
          if (!cmdRegex.hasOwnProperty(key)) {
            continue
          }
          if (!cmdRegex[key].test(command.trim())) {
            continue
          }
          console.log(`コマンド ${command} を実行します`)
          await sendToMinecraft(command.slice(1).trim())
          return
        }

        console.log(`コマンド ${command} は実行可能リストに定義されていません`)
      }
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
