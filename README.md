Minecord
===

See [here](https://github.com/node-link/minecord) for the original README.md

---

## 概要

[node-link / minecord](https://github.com/node-link/minecord) について、破壊的変更を加えつつ TypeScript で記述しなおしたものです。


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
