/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { RegexDic } from '@/core'

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
