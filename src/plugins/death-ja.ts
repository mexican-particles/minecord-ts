import Plugin from '../Plugin'
import { sendToMinecraftWithRegexRepDic } from '../pluginHelper'
import { deathRegexRepDicJa } from './dictionaries/deathRegexJa'

export default new Plugin({
  async minecraft(args) {
    await sendToMinecraftWithRegexRepDic(args, deathRegexRepDicJa)
  },
  discord({}) {},
})
