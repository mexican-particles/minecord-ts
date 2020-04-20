import Plugin from '../Plugin'
import { sendToMinecraftWithRegexRepDic } from '../pluginHelper'
import { loginRegexRepDicJa } from './dictionaries/loginRegexJa'

export default new Plugin({
  async minecraft(args) {
    await sendToMinecraftWithRegexRepDic(args, loginRegexRepDicJa)
  },
  discord({}) {},
})
