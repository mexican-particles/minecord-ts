Minecord
===

See [here](https://github.com/node-link/minecord) for the original README.md

---

## 概要

[node-link / minecord](https://github.com/node-link/minecord) について、破壊的変更を加えつつ TypeScript で記述しなおしたものです。

## 設定ファイルについて

#### 変更前
```typescript
type Config = {
  pluginsDir: string | null
  enable: string[]
  disable: string[]
  minecraftLog: string
  minecraftRconHost: string
  minecraftRconPort: number
  minecraftRconPassword: string
  discordBotToken: string
  discordChannel: string
  encode: string
}
```

#### 変更後
```typescript
type Config = {
  language: 'en' | 'ja'
  pluginList: string[]
  pluginDir: string
  dictionaryList: string[]
  dictionaryDir: string
  minecraftLog: string
  minecraftRconHost: string
  minecraftRconPort: number
  minecraftRconPassword: string
  discordBotToken: string
  discordChannel: string
  encode: string
}
```

- `language`: 出力時に使用する言語を指定します
- `pluginsDir` -> `pluginDir`
- `enable` -> `pluginList`
- `disable` -> 削除しました
- `dictionaryList`: 使用する辞書ファイルを指定します
- `dictionaryDir`: 外部ディレクトリに存在する辞書ファイルを参照するとき、その外部ディレクトリを指定します

## プラグインの互換性について

### `discord()` メソッド
#### 変更前

```typescript
import Rcon from 'modern-rcon'
import { Client, Message } from 'discord.js'

type DiscordArgs = {
  message: Message
  channel: Message['channel']
  user: Client['user']
  sendDiscord: (
    ...args: Parameters<Message['channel']['send']>
  ) => Promise<Message>
  sendMinecraft: (
    ...args: Parameters<Rcon['send']>
  ) => ReturnType<Rcon['send']>
}
```

#### 変更後

```typescript
import Rcon from 'rcon-ts'
import { Client, Message } from 'discord.js'

type DiscordArgs = {
  message: Message
  user: Client['user']
  sendDiscord: (
    ...args: Parameters<Message['channel']['send']>
  ) => Promise<Message>
  sendMinecraft: (
    ...args: Parameters<Rcon['send']>
  ) => ReturnType<Rcon['send']>
}
```

- `channel` -> `message.channel`
 
### `minecraft()` メソッド
#### 変更前

```typescript
import Rcon from 'modern-rcon'
import { Client, Message } from 'discord.js'

type MinecraftArgs = {
  log  : string
  time: string
  causedAt: string
  level: string
  message: string
  channel: Message['channel']
  user: Client['user']
  sendDiscord: (
    ...args: Parameters<Message['channel']['send']>
  ) => Promise<Message>
  sendMinecraft: (
    ...args: Parameters<Rcon['send']>
  ) => ReturnType<Rcon['send']>
}
```

#### 変更後

```typescript
import Rcon from 'rcon-ts'
import { Client, Message } from 'discord.js'

type MinecraftArgs = {
  logLine: MinecraftLogLine
  channel: Message['channel']
  user: Client['user']
  sendDiscord: (
    ...args: Parameters<Message['channel']['send']>
  ) => Promise<Message>
  sendMinecraft: (
    ...args: Parameters<Rcon['send']>
  ) => ReturnType<Rcon['send']>
}
```

- `log` -> `logLine.log`
- `time` -> `logLine.time`
- `causedAt` -> `logLine.causedAt`
- `level` -> `logLine.level`
- `message` -> `logLine.message`
