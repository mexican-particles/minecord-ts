import { Plugin } from '../Plugin'
import { cmdInvoker } from './libs/cmdInvoker'

const setOnClearMorning = async (
  ...[command, sendToMinecraft]: Parameters<typeof cmdInvoker>
): Promise<void> => {
  if (command !== '!mark') {
    return
  }

  const result = await sendToMinecraft('time query daytime')
  if (typeof result !== 'string') {
    return
  }
  const daytime: string | null = /^The time is (\w+)$/.exec(result)?.[1] ?? null
  if (daytime === null) {
    console.log('正しく時刻を取得できませんでした', result)
    return
  }

  const time: number = 24000 - parseInt(daytime) + 1000
  await cmdInvoker(`!time add ${time}`, sendToMinecraft)
  await cmdInvoker(`!weather clear`, sendToMinecraft)
}

const mark: Plugin = {
  async discord({ message, sendToMinecraft }): Promise<void> {
    await Promise.all(
      message.cleanContent.split(/\r?\n/g).map(
        async (command: string): Promise<void> => {
          await setOnClearMorning(command, sendToMinecraft)
        }
      )
    )
  },
  async minecraft({ logLine, sendToDiscord, sendToMinecraft }) {
    if (!logLine.isUnmutedChatMessage()) {
      return
    }
    const message: string | null =
      /^<[\w\d_]+> (.*)$/.exec(logLine.message)?.[1] ?? null
    if (message === null) {
      return
    }
    await setOnClearMorning(message, sendToMinecraft)
  },
}

export default mark
