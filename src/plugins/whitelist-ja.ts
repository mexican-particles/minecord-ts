import Plugin from '../Plugin'
import { sendToMinecraftWithRegexRepDic } from '../pluginHelper'
import { whiteListRegexJa } from './dictionaries/whiteListRegexJa'

export default new Plugin({
  async minecraft(args) {
    await sendToMinecraftWithRegexRepDic(args, whiteListRegexJa)
  },
  discord({}) {},
})
