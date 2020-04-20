import Plugin from '../Plugin'

const regexpArray = [
  /^([\w\d_]+)\[.*] logged\sin\swith\sentity\sid\s\w+\sat\s\(.*\).*$/,
  /^(.*)\sleft\sthe\sgame$/,
]

export default new Plugin({
  async minecraft({ causedAt, level, message, sendToDiscord }) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    if (regexpArray.some((regexp) => regexp.test(message)))
      await sendToDiscord(message)
  },
  discord({}) {},
})
