import { cmdRegex } from '@/plugins/libs/cmdRegex'

export const cmdInvoker = async <T>(
  command: string,
  invoker: (command: string) => Promise<T>
): Promise<void> => {
  if (!command.startsWith('!')) {
    return
  }

  for (const key in cmdRegex) {
    if (!cmdRegex.hasOwnProperty(key)) {
      continue
    }
    if (!cmdRegex[key].test(command.trim())) {
      continue
    }
    console.log(`コマンド ${command} を実行します`)
    await invoker(command.slice(1).trim())
    return
  }

  console.log(`コマンド ${command} は実行可能リストに定義されていません`)
}
