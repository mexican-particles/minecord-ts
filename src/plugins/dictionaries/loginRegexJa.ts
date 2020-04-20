import { RegexRepDic } from './types'

export const loginRegexRepDicJa: RegexRepDic = {
  login: [
    /^([\w\d_]+)\[.*] logged in with entity id \w+ at \(.*\).*$/,
    (message, player) => `${player} がログインしたみたい。`,
  ],
  logout: [
    /^(.*) left the game$/,
    (message, player) => `${player} がログアウトしたみたい。`,
  ],
}
