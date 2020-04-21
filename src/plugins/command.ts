import Plugin from '../Plugin'
import { cmdRegex, cmdRegexRepDic } from './dictionaries/cmdRegex'
import { sendToMinecraftWithRegexRepDic } from '../pluginHelper'

export default new Plugin({
  async discord({ message, sendToMinecraft, sendToDiscord }): Promise<void> {
    await message.cleanContent.split(/\r?\n/g).map(
      async (command: string): Promise<void> => {
        const trimmed: string = command.trim()
        if (!trimmed.startsWith('!') || trimmed === '!ping') {
          return
        }

        for (const key in cmdRegex) {
          if (cmdRegex.hasOwnProperty(key) && cmdRegex[key].test(trimmed)) {
            console.log(`コマンド ${trimmed} を実行します`)
            await sendToMinecraft(trimmed.slice(1))
            return
          }
        }

        await sendToDiscord(
          `コマンド ${trimmed} は実行可能リストに定義されていません`
        )
      }
    )
  },

  async minecraft(args) {
    await sendToMinecraftWithRegexRepDic(args, cmdRegexRepDic)
  },
})
