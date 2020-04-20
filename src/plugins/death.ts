import Plugin from '../Plugin'
import { sendToMinecraftWithRegexDic } from '../pluginHelper'
import { deathRegex } from './dictionaries/deathRegex'

export default new Plugin({
  async minecraft(args) {
    await sendToMinecraftWithRegexDic(args, deathRegex)
  },
  discord({}) {},
})
