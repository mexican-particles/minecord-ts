import { loggerFactory } from '@/core/logger/loggerFactory'

export const error = <T>(message: string, extra?: T, error?: unknown): void => {
  const logger = loggerFactory()

  if (error instanceof Error) {
    const reason = {
      name: error.name,
      message: error.message,
      stack: error.stack
    }
    const assignedReason = Object.assign(reason, error)
    logger.error(message, { ...extra, reason: { ...assignedReason } })
    return
  }

  if (typeof extra === 'undefined') {
    logger.error(message)
    return
  }
  logger.error(message, extra)
}
