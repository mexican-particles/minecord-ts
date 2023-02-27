import { MinecraftLogLine } from './minecraftLogLine'

export type CaptureMap = {
  log: number
  time: number
  causedAt: number
  level: number
  message: number
}

type CriteriaFunction = (log: MinecraftLogLine) => boolean

interface LogCriteria {
  isLogLevelInfo: CriteriaFunction
  isServerMessage: CriteriaFunction
  isServerInfoMessage: CriteriaFunction
  isChatMessage: CriteriaFunction
  isMutedMessage: CriteriaFunction
}
