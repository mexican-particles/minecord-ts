import Plugin from '../Plugin'
import { cmdRegex, cmdRegexRepDic } from './dictionaries/cmdRegex'
import { sendToMinecraftWithRegexRepDic } from '../pluginHelper'

export default new Plugin({
  async discord({ message, sendToMinecraft, sendToDiscord }): Promise<void> {
    await message.cleanContent.split(/\r?\n/g).map(
      async(command: string): Promise<void> => {
        if (!command.startsWith('!') || command === '!ping') {
          return
        }

        for (const key in cmdRegex) {
          if (cmdRegex.hasOwnProperty(key) && cmdRegex[key].test(command.trim())) {
            console.log(`コマンド ${command} を実行します`)
            await sendToMinecraft(command.slice(1).trim())
            return
          }
        }

        await sendToDiscord(
          `コマンド ${command} は実行可能リストに定義されていません`
        )
      }
    )
  },

  async minecraft(args) {
    await sendToMinecraftWithRegexRepDic(args, cmdRegexRepDic)
  },
})
