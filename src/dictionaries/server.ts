import { RegexDic } from '../dictionaryHelper'

const server: RegexDic = {
  stopping: {
    pattern: /^Stopping server$/,
    en: () => 'Minecraft server has stopped.',
    ja: () => 'マインクラフトサーバは停止しました',
  },
  starting: {
    pattern: /^Starting minecraft server version [^\s]+$/,
    en: () => 'Minecraft server is starting...',
    ja: () => 'マインクラフトサーバは起動しています。。。',
  },
  ready: {
    pattern: /^Done \([^\s]+s\)! For help, type "help"( or "\?")?$/,
    en: () => 'Minecraft server was started.',
    ja: () => 'マインクラフトサーバは起動しました',
  },
}

export default server
