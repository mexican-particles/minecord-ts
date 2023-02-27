import { client, messageFactory } from '@/core/discord'

export const onReady = async (): Promise<boolean> => {
  await messageFactory()
  return client.isReady()
}
