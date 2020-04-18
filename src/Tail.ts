import { EventEmitter } from 'events'
import { createReadStream, Stats, statSync } from 'fs'
import { createInterface } from 'readline'
import { dirname } from 'path'
import { FSWatcher, watch } from 'chokidar'
import * as iconv from 'iconv-lite'

export default class Tail extends EventEmitter {
  private readonly filename: string
  private readonly encoding: string
  private watcher: FSWatcher | null
  private position: number

  constructor(filename: string, encoding: string = 'utf-8') {
    super()
    this.filename = filename
    this.encoding = encoding
    this.watcher = null
    this.position = 0
    this.watch()
  }

  watch(): void {
    if (this.watcher) return

    const stats = this.getStats()
    if (stats) this.position = stats.size

    this.watcher = watch(dirname(this.filename), {
      ignoreInitial: true,
      alwaysStat: true,
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 50,
      },
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

  unwatch(): void {
    if (!this.watcher) return
    this.watcher.close()
    this.watcher = null
  }

  private getStats(): Stats | false {
    try {
      return statSync(this.filename)
    } catch (e) {
      return false
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
        end: stats.size - 1,
      }).pipe(iconv.decodeStream(this.encoding)),
    }).on('line', (line) => {
      this.emit('line', line)
    })

    this.position = stats.size
  }

  private handleRemoveFile(): void {
    this.position = 0
  }
}
