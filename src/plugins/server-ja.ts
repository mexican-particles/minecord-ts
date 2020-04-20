import Plugin from '../Plugin'
import { sendToMinecraftWithRegexRepDic } from '../pluginHelper'
import { serverRegexRepDicJa } from './dictionaries/serverRegexJa'

export default new Plugin({
  async minecraft(args) {
    await sendToMinecraftWithRegexRepDic(args, serverRegexRepDicJa)
  },
  discord({}) {},
})
