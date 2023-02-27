import consola from 'consola'
import { logCriteria, regexpLog } from '@/definitions/minecraft/logFormat'

export class MinecraftLogLine {
  private readonly regExpExecArray: RegExpExecArray | null

  constructor(line: string) {
    const regExpExecArray: RegExpExecArray | null = regexpLog.exec(line)

    if (regExpExecArray === null) {
      consola.warn('The output log is not in the expected format.', { line })
    }

    this.regExpExecArray = regExpExecArray
  }

  get log(): string {
    return this.regExpExecArray?.input ?? ''
  }

  get time(): string {
    return this.regExpExecArray?.groups?.time ?? ''
  }

  get causedAt(): string {
    return  this.regExpExecArray?.groups?.causedAt ?? ''
  }

  get level(): string {
    return  this.regExpExecArray?.groups?.level ?? ''
  }

  get message(): string {
    return  this.regExpExecArray?.groups?.message ?? ''
  }

  isLogLevelInfo(): boolean {
    return logCriteria.isLogLevelInfo(this)
  }

  isServerMessage(): boolean {
    return logCriteria.isServerMessage(this)
  }

  isServerInfoMessage(): boolean {
    return logCriteria.isServerInfoMessage(this)
  }

  isChatMessage(): boolean {
    return logCriteria.isChatMessage(this)
  }

  isMutedMessage(): boolean {
    return logCriteria.isLogLevelInfo(this)
  }
}
