import Plugin from '../Plugin'
import { cmdRegexDic } from './dictionaries/cmdRegexDic'
import Replacers from '../Replacers'

const replacers = new Replacers()
  .add(
    /^\[Rcon: Set the weather to (clear|rain|rain & thunder)]$/,
    (message, weather) => `天気を ${weather} にしました`
  )
  .add(
    /^\[Rcon: Set the time to (\w+)]$/,
    (message, time) => `時刻を ${time} にしました`
  )

export default new Plugin({
  async discord({ message, sendToMinecraft, sendToDiscord }): Promise<void> {
    if (
      !message['cleanContent'].startsWith('!') ||
      message['cleanContent'] === '!ping'
    ) {
      return
    }
    for (const key in cmdRegexDic) {
      if (
        cmdRegexDic.hasOwnProperty(key) &&
        cmdRegexDic[key].test(message['cleanContent'])
      ) {
        const command: string = message['cleanContent'].slice(1)
        console.log(`コマンド ${command} を実行します`)
        await sendToMinecraft(command)
        return
      }
    }
    await sendToDiscord(
      `コマンド ${message['cleanContent']} は実行可能リストに定義されていません`
    )
  },

  async minecraft({ causedAt, level, message, sendToDiscord }): Promise<void> {
    if (causedAt.indexOf('Server thread') === -1 || level !== 'INFO') {
      return
    }
    const newMessage: string | false = replacers.replace(message.toString())
    if (newMessage !== false) {
      await sendToDiscord({ content: newMessage.toString() })
    }
  },
})
