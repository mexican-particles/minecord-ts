import { RegexRepDic } from './types'

export const chatRegexRepDic: RegexRepDic = {
  angleBrackets: [
    /^<([\w\d_]+)> (.*)$/,
    (message, player, text) => `**${player}**: ${text}`,
  ],
  brackets: [
    /^\[([\w\d_]+)] (.*)$/,
    (message, player, text) => `**${player}**: ${text}`,
  ],
}
