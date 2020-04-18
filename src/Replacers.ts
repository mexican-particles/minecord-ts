import Replacer from './Replacer'

export default class Replacers {
  private readonly replacers: Replacer[]
  constructor() {
    this.replacers = []
  }

  add(regexp: RegExp, replacer: Replacer['replacer']): this {
    this.replacers.push(new Replacer(regexp, replacer))
    return this
  }

  replace(str: string): string | false {
    const replacer = this.replacers.find((replacer) => replacer.test(str))
    return replacer ? replacer.replace(str) : false
  }
}
