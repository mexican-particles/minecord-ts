import { loggerFactory } from '@/core/logger/loggerFactory'

export const debug = <T>(message: string, extra?: T): void => {
  const logger = loggerFactory()
  if (typeof extra === 'undefined') {
    logger.debug(message)
    return
  }
  logger.debug(message, extra)
}
