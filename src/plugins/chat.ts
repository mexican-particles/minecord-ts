import Replacers from '../Replacers'
import Plugin from '../Plugin'

const replacers: Replacers = new Replacers()
  .add(/^<(.*?)>\s(.*)$/, (message, player, text) => `**${player}**: ${text}`)
  .add(/^\[(.*?)]\s(.*)$/, (message, player, text) => `**${player}**: ${text}`)

export default new Plugin({
  async discord({ message, sendToMinecraft }): Promise<void> {
    const text: string = `<${
      (message['member'] && message['member']['nickname']) ||
      message['author']['username']
    }> ${message['cleanContent']}`
    await sendToMinecraft(`tellraw @a ${JSON.stringify({ text: text })}`)
  },

  async minecraft({ causedAt, level, message, sendToDiscord }): Promise<void> {
    if (
      (causedAt.indexOf('Server thread') === -1 &&
        causedAt.indexOf('Async Chat Thread') === -1) ||
      level !== 'INFO' ||
      message.indexOf('mute') !== -1
    ) {
      return
    }
    const newMessage: string | false = replacers.replace(message.toString())
    if (newMessage !== false) {
      await sendToDiscord({ content: newMessage.toString() })
    }
  },
})
