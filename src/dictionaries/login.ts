import { RegexDic } from '../dictionaryHelper'

const login: RegexDic = {
  login: {
    pattern: /^([\w\d_]+)\[[^\s]+] logged in with entity id \w+ at \(.*\)$/,
    ja: (message, player) => `${player} がログインしました`,
  },
  logout: {
    pattern: /^([^\s]+) left the game$/,
    ja: (message, player) => `${player} がログアウトしました`,
  },
}

export default login
