/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { RegexDic } from '@/dictionary/types'

const whiteList: RegexDic = {
  add: {
    pattern: /^\[([^\s]+): Added ([^\s]+) to the whitelist]$/,
    ja: (message, player, target) =>
      `${player} は ${target} をホワイトリストに追加しました`,
  },
  remove: {
    pattern: /^\[([^\s]+): Removed ([^\s]+) from the whitelist]$/,
    ja: (message, player, target) =>
      `${player} は ${target} をホワイトリストから削除しました`,
  },
}

export default whiteList
