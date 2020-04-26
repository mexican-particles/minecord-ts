import { RegexDic } from '../dictionaryHelper'

const whiteList: RegexDic = {
  add: {
    pattern: /^\[(.*): Added (.*) to the whitelist]$/,
    ja: (message, player, target) =>
      `${player} は ${target} をホワイトリストに追加しました`,
  },
  remove: {
    pattern: /^\[(.*): Removed (.*) from the whitelist]$/,
    ja: (message, player, target) =>
      `${player} は ${target} をホワイトリストから削除しました`,
  },
}

export default whiteList
