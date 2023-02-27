import { IEvent, ISubscribe, SubscribeList } from '../types'
import { error } from '@/core/logger'

export class Broker {
  private readonly subscriberList: SubscribeList

  constructor(subscriberList: SubscribeList) {
    this.subscriberList = subscriberList
  }

  async publish(event: IEvent): Promise<void> {
    const eventId = event.eventId()

    if (typeof this.subscriberList?.[eventId] === 'undefined') {
      error('An undefined event was published.', { eventId })
      return
    }

    await Promise.all(
      this.subscriberList[eventId].map(
        (subscriber: ISubscribe): Promise<void> => subscriber.onMessage(event)
      )
    )
  }
}
