type ReplacerType = (substring: string, ...args: any[]) => string

export default class Replacer {
  private readonly regexp: RegExp
  private readonly replacer: ReplacerType

  constructor(regexp: RegExp, replacer: ReplacerType) {
    this.regexp = regexp
    this.replacer = replacer
  }

  test(str: string): boolean {
    return this.regexp.test(str)
  }

  replace(str: string): string {
    return str.replace(this.regexp, this.replacer)
  }
}
