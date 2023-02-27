import { Broker } from '../broker/broker'
import { AbstractPlugin } from '../plugin/abstractPlugin'
import { EventId, SubscribeList } from '../types'
import { config } from '@/core/config'
import { moduleLoader } from '@/core/utils'

const pluginPathList: string[] = ['./../../definitions/plugins']
if (config.pluginDir) {
  pluginPathList.push(config.pluginDir)
}

const moduleList = moduleLoader<{ new(): AbstractPlugin; }>(config.pluginList, pluginPathList)
const loadedList = moduleList.map(
  (plugin): AbstractPlugin => new plugin()
)

const subscriberList = config.pluginList.reduce<SubscribeList>(
  (carry: SubscribeList, eventId: EventId): SubscribeList => {
    carry[eventId] = loadedList
    return carry
  }, {})

export const broker = new Broker(subscriberList)
