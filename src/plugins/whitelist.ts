import Plugin from '../Plugin'

const regexpArray = [
  /^\[(.*):\sAdded\s(.*)\sto\sthe\swhitelist]$/,
  /^\[(.*):\sRemoved\s(.*)\sfrom\sthe\swhitelist]$/,
]

export default new Plugin({
  async minecraft({ causedAt, level, message, sendToDiscord }) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    if (regexpArray.some((regexp) => regexp.test(message)))
      await sendToDiscord(message)
  },
  discord({}) {},
})
