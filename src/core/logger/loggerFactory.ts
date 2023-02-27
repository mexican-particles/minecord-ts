import * as consola from 'consola'
import { LogLevel } from 'consola'
import { config } from '@/core/config'
import { debug } from '@/core/logger/debug'

let created: consola.Consola
switch (config.logLevel) {
  case 'info':
    created = consola.default.create({
      level: consola.LogLevel.Info,
      reporters: [
        new consola.FancyReporter()
      ]
    })
    break
  case 'error':
    created = consola.default.create({
      level: consola.LogLevel.Error,
      reporters: [
        new consola.FancyReporter()
      ]
    })
    break
  case 'debug':
  default:
    created = consola.default.create({
      level: consola.LogLevel.Debug,
      reporters: [
        new consola.JSONReporter()
      ]
    })
    break
}

created
  .withTag('loggerFactory')
  .debug('Object: Logger is loaded.')

export const loggerFactory = (): consola.Consola => {
  if (created.level > LogLevel.Debug) {
    return created
  }

  try {
    throw new Error()
  } catch (e) {
    if (e instanceof Error) {
      if (typeof e?.stack === 'undefined') {
        return created.withTag('untagged')
      }

      const matches = e.stack.match(/(?<=\/)(\w+)(?=\.js)/g)
      return created.withTag(matches?.[2] ?? 'untagged')
    }
  }
  return created.withTag('untagged')
}
