import { RegexRepDic } from './types'

export const serverRegexRepDicJa: RegexRepDic = {
  stopping: [/^Stopping server$/, () => 'サーバーが止まったみたい。'],
  starting: [
    /^Starting minecraft server version .*$/,
    () => 'サーバーが動きだしたみたい。',
  ],
  ready: [
    /^Done \(.*s\)! For help, type "help" or "\?"$/,
    () => 'サーバーの準備ができたみたい。',
  ],
}
