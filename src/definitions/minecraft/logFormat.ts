import { LogCriteria, MinecraftLogLine } from '@/core'

export const regexpLog: RegExp = /^\[(?<time>.*)]\s\[(?<causedAt>[^/]*)\/(?<level>.*)][^:]*:\s(?<message>.*)$/

export const logCriteria: LogCriteria = {
  isLogLevelInfo: (log: MinecraftLogLine): boolean => {
    return log.level === 'INFO'
  },
  isServerMessage: (log: MinecraftLogLine): boolean => {
    return log.causedAt.includes('Server thread')
  },
  isServerInfoMessage: (log: MinecraftLogLine): boolean => {
    return log.isLogLevelInfo() && log.isServerMessage()
  },
  isChatMessage: (log: MinecraftLogLine): boolean => {
    return log.causedAt.includes('Async Chat Thread')
  },
  isMutedMessage: (log: MinecraftLogLine): boolean => {
    return log.message.includes('mute')
  }
}
