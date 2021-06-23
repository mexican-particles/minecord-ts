export class MinecraftLogLine {
  private readonly _log: string
  private readonly _time: string
  private readonly _causedAt: string
  private readonly _level: string
  private readonly _message: string

  constructor(regExpExecArray: RegExpExecArray) {
    const [
      log,
      time,
      causedAt,
      level,
      message,
    ]: RegExpExecArray = regExpExecArray
    this._log = log
    this._time = time
    this._causedAt = causedAt
    this._level = level
    this._message = message
  }

  get log(): string {
    return this._log
  }

  get time(): string {
    return this._time
  }

  get causedAt(): string {
    return this._causedAt
  }

  get level(): string {
    return this._level
  }

  get message(): string {
    return this._message
  }

  isLogLevelInfo(): boolean {
    return this.level === 'INFO'
  }

  isServerMessage(): boolean {
    return this.causedAt.includes('Server thread')
  }

  isServerInfoMessage(): boolean {
    return this.isLogLevelInfo() && this.isServerMessage()
  }

  isChatMessage(): boolean {
    return this.causedAt.includes('Async Chat Thread')
  }

  isMutedMessage(): boolean {
    return this.message.includes('mute')
  }

  isUnmutedChatMessage(): boolean {
    return !this.isMutedMessage() && this.isChatMessage()
  }
}
