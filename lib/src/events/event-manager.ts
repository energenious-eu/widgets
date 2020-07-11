import { UID } from '../types';
import SubscriptionList from './subscriptions-list';
import { Detail, SubscriptionType, Subscription } from './types';

export default class EventManager {
  private title: string;

  private uid: string;

  private subscriptions: SubscriptionList = new SubscriptionList();

  constructor(title: string, uid: string) {
    this.title = title;
    this.uid = uid;
  }

  private emit<T = any>(topic: string, detail: Detail<T>): void {
    const event: CustomEvent<Detail<T>> = new CustomEvent<Detail<T>>(topic, {
      detail,
    });

    dispatchEvent(event);
  }

  broadcast<T = any>(topic: string, params: T): void {
    this.emit<T>(topic, { params });
  }

  scopedBroadcast<T = any>(topic: string, params: T): void {
    this.emit<T>(this.scopeEventName(topic), { params });
  }

  multicast<T = any>(topic: string, uids: string[], params: T): void {
    const detail: Detail<T> = { uids, params };

    this.emit<T>(topic, detail);
  }

  scopedMulticast<T = any>(topic: string, uids: string[], params: T): void {
    const detail: Detail<T> = { uids, params };

    this.emit<T>(this.scopeEventName(topic), detail);
  }

  sub<T = any>({
    topic,
    type = SubscriptionType.FULL,
    callback,
  }: {
    topic: Subscription['topic'];
    type?: Subscription['type'];
    callback: (e: T) => any;
  }) {
    const listener = (e: CustomEvent<Detail<T>>) => {
      const uids: UID[] = e.detail.uids || [];

      // If broadcast or uid specified in multicast
      if (
        (uids.length === 0 && type === SubscriptionType.FULL) ||
        uids.includes(this.uid)
      ) {
        callback(e.detail.params);
      }
    };

    this.subscriptions.add({
      topic,
      type,
      listener: listener as <T>(e: CustomEvent<Detail<T>>) => void,
    });
  }

  subscribe<T = any>(topic: string, callback: (detail: T) => void) {
    this.sub({ topic, callback });
  }

  scopedSubscribe<T = any>(topic: string, callback: (detail: T) => void) {
    this.sub({ topic: this.scopeEventName(topic), callback });
  }

  selectiveSubscribe<T = any>(topic: string, callback: (detail: T) => void) {
    this.sub({ topic, callback, type: SubscriptionType.SELECTIVE });
  }

  unsubscribe(topic: string, type: SubscriptionType) {
    this.subscriptions.remove(topic, type);
  }

  private scopeEventName(topic: string) {
    return `${this.title}_${topic}`;
  }
}
