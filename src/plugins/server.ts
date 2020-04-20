import Plugin from '../Plugin'
import { sendToMinecraftWithRegexDic } from '../pluginHelper'
import { serverRegex } from './dictionaries/serverRegex'

export default new Plugin({
  async minecraft(args) {
    await sendToMinecraftWithRegexDic(args, serverRegex)
  },
  discord({}) {},
})
