import consola from 'consola'
import { cmdInvoker } from './libs/cmdInvoker'
import { AbstractPlugin, toDiscordEvent, toMinecraftEvent } from '@/core'

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
    consola.error('正しく時刻を取得できませんでした', result)
    return
  }

  const time: number = 24000 - parseInt(daytime) + 1000
  await cmdInvoker(`!time add ${time}`, sendToMinecraft)
  await cmdInvoker(`!weather clear`, sendToMinecraft)
}


class Mark extends AbstractPlugin {
  async discord(e: toDiscordEvent): Promise<void> {
    await Promise.all(
      e.message.cleanContent.split(/\r?\n/g).map(
        async (command: string): Promise<void> => {
          await setOnClearMorning(command, e.sendToMinecraft)
        }
      )
    )
  }

  async minecraft(e: toMinecraftEvent): Promise<void> {
    if (e.logLine.isMutedMessage()) {
      return
    }
    const message: string | null =
      /^<[\w\d_]+> (.*)$/.exec(e.logLine.message)?.[1] ?? null
    if (message === null) {
      return
    }
    await setOnClearMorning(message, e.sendToMinecraft)
  }
}

export default Mark
