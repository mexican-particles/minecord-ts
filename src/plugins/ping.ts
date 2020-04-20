import Plugin from '../Plugin'

export default new Plugin({
  async discord({ message, sendToDiscord }): Promise<void> {
    if (message['cleanContent'] !== '!ping') {
      return
    }
    await sendToDiscord({ content: 'pong, from minecord' })
  },

  //todo
  minecraft({}) {},
})
