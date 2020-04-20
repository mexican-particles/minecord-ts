import { RegexRepDic } from './types'

export const whiteListRegexJa: RegexRepDic = {
  add: [
    /^\[(.*): Added (.*) to the whitelist]$/,
    (message, player, target) =>
      `${player} が ${target} をホワイトリストに追加したみたい。`,
  ],
  remove: [
    /^\[(.*): Removed (.*) from the whitelist]$/,
    (message, player, target) =>
      `${player} が ${target} をホワイトリストから削除したみたい。`,
  ],
}
