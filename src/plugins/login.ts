import Plugin from '../Plugin'
import { sendToMinecraftWithRegexDic } from '../pluginHelper'
import { loginRegex } from './dictionaries/loginRegex'

export default new Plugin({
  async minecraft(args) {
    await sendToMinecraftWithRegexDic(args, loginRegex)
  },
  discord({}) {},
})
