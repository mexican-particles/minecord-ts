import { RegexDic } from '@/dictionaryHelper'

export const chatRegexRepDic: RegexDic = {
  angleBrackets: {
    pattern: /^<([\w\d_]+)> (.*)$/,
    en: (message, player, text) => `**${player}**: ${text}`,
  },
  brackets: {
    pattern: /^\[([\w\d_]+)] (.*)$/,
    en: (message, player, text) => `**${player}**: ${text}`,
  },
}
