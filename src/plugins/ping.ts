import { Plugin } from '../Plugin'

const ping: Plugin = {
  async discord({ message, sendToDiscord, sendToMinecraft }): Promise<void> {
    if (message['cleanContent'] !== '!ping') {
      return
    }
    await sendToDiscord({ content: 'pong, from minecord' })
    const result = await sendToMinecraft('time query gametime')
    if (/The time is \w+/.test(result)) {
      await sendToDiscord({ content: 'pong, from minecraft' })
      return
    }
    await sendToDiscord({ content: 'マインクラフトと接続できていないかも？' })
  },
}

export default ping
