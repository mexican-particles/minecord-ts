import Plugin from '../Plugin'
import { cmdRegexDic } from './dictionaries/cmdRegexDic'

export default new Plugin({
  async discord({ message, sendToMinecraft, sendToDiscord }): Promise<void> {
    if (
      !message['cleanContent'].startsWith('!') ||
      message['cleanContent'] === '!ping'
    ) {
      return
    }
    for (const key in cmdRegexDic) {
      if (cmdRegexDic[key].test(message['cleanContent'])) {
        await sendToMinecraft(message['cleanContent'])
        return
      }
    }
    await sendToDiscord(
      `コマンド ${message['cleanContent']} は実行可能リストに定義されていません`
    )
  },

  minecraft({}) {},
})
