import consola from 'consola'
import { cmdRegex } from './cmdRegex'
import { info } from '@/core'

export const cmdInvoker = async <T>(
  command: string,
  invoker: (command: string) => Promise<T>
): Promise<void> => {
  if (!command.startsWith('!')) {
    return
  }

  for (const key in cmdRegex) {
    if (!Object.prototype.hasOwnProperty.call(cmdRegex, key)) {
      continue
    }
    if (!cmdRegex[key].test(command.trim())) {
      continue
    }
    info(`Execute command: ${command}`)
    await invoker(command.slice(1).trim())
    return
  }

  consola.info(`Command: ${command} is not defined in the executable list.`)
}
