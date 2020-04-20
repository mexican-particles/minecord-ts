import Replacer from './Replacer'
import { RegexRepDic } from './plugins/dictionaries/types'

export default class Replacers {
  private readonly replacers: Replacer[]
  constructor() {
    this.replacers = []
  }

  add(regexp: RegExp, replacer: Replacer['replacer']): this {
    this.replacers.push(new Replacer(regexp, replacer))
    return this
  }

  addDic(regexRepDic: RegexRepDic): this {
    for (const key in regexRepDic) {
      if (regexRepDic.hasOwnProperty(key)) {
        this.add(regexRepDic[key][0], regexRepDic[key][1])
      }
    }
    return this
  }

  replace(str: string): string | false {
    const replacer = this.replacers.find((replacer) => {
      return replacer.test(str)
    })
    return replacer ? replacer.replace(str) : false
  }
}
