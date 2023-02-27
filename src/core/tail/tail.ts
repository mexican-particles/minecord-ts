import { EventEmitter } from 'events'
import { createReadStream, Stats, statSync } from 'fs'
import { dirname } from 'path'
import { createInterface } from 'readline'
import { FSWatcher, watch } from 'chokidar'
import * as iconv from 'iconv-lite'
import { config } from '@/core/config'
import { error, info } from '@/core/logger'

class Tail extends EventEmitter {
  private readonly filename: string
  private readonly encoding: string
  private watcher: FSWatcher | null
  private position: number

  constructor() {
    super()
    this.filename = config.minecraftLog
    this.encoding = config.encode
    this.watcher = null
    this.position = 0
    this.watch()
  }

  watch(): void {
    if (this.watcher) {
      return
    }

    const stats: Stats | null = this.getStats()
    if (stats === null) {
      return
    }

    this.position = stats.size
    this.watcher = watch(dirname(this.filename), {
      ignoreInitial: true,
      alwaysStat: true,
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 50
      }
    })
      .on('add', (basename: string, stats?: Stats) => {
        if (basename === this.filename && typeof stats !== 'undefined') {
          this.handleCreateFile(stats)
        }
      })
      .on('change', (basename: string, stats?: Stats) => {
        if (basename === this.filename && typeof stats !== 'undefined') {
          this.handleChangeFile(stats)
        }
      })
      .on('unlink', (basename: string) => {
        if (basename === this.filename) this.handleRemoveFile()
      })
  }

  async unwatch(): Promise<void> {
    if (this.watcher === null) {
      return
    }
    await this.watcher.close()
    this.watcher = null
  }

  private getStats(): Stats | null {
    try {
      const stats = statSync(this.filename)
      info(`${this.filename} is loaded.`)
      return stats
    } catch (err) {
      error(
        `Stats could not be loaded. Maybe the file doesn't exist, or there is a permission problem?`,
        { filename: this.filename },
        err
      )
      return null
    }
  }

  private handleCreateFile(stats: Stats): void {
    this.position = 0
    this.handleChangeFile(stats)
  }

  private handleChangeFile(stats: Stats): void {
    if (stats.size < this.position) {
      this.position = 0
    }
    if (!stats.size) {
      return
    }

    createInterface({
      input: createReadStream(this.filename, {
        start: this.position,
        end: stats.size - 1
      }).pipe(iconv.decodeStream(this.encoding))
    }).on('line', (line) => {
      this.emit('line', line)
    })

    this.position = stats.size
  }

  private handleRemoveFile(): void {
    this.position = 0
  }
}

export const tail = new Tail()
