import { loggerFactory } from '@/core/logger/loggerFactory'

export const info = (message: string): void => {
  const logger = loggerFactory()
  logger.info(message)
}
