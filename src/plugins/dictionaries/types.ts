import Replacers from '../../Replacers'

export type RegexDic = { [key: string]: RegExp }
export type RegexRepDic = { [key: string]: Parameters<Replacers['add']> }
