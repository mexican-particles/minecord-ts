import Plugin from '../Plugin'
import { sendToMinecraftWithRegexDic } from '../pluginHelper'
import { whiteListRegex } from './dictionaries/whiteListRegex'

export default new Plugin({
  async minecraft(args) {
    await sendToMinecraftWithRegexDic(args, whiteListRegex)
  },
  discord({}) {},
})
